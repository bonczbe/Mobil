        import React, { useState } from 'react';
        import {  NavigationContainer } from '@react-navigation/native';
        import { createNativeStackNavigator } from '@react-navigation/native-stack';
        import { 
          View,
          Text,
          Button,
          StyleSheet,
          ScrollView,
          Image,
          Pressable
        } from 'react-native';

        function navbar(navigation){
          return(
                <View style={styles.nav}>
                  <Button
                    title="Home"
                    onPress={() => navigation.navigate({name:'Home',params:{dark:darkenabled}})}
                  />
                  <Button
                    title="Game"
                    onPress={() => navigation.navigate({name:'Game',params:{dark:darkenabled}})}
                  />
                  <Button
                    title="Options"
                    onPress={() => navigation.navigate({name:'Options',params:{dark:darkenabled}})}
                  />
                  <Button
                    title="More"
                    onPress={() => navigation.navigate({name:'More',params:{dark:darkenabled}})}
                  />
                </View>)
        }

        function HomeScreen({navigation,route}) {
          const styleNowBackg = route.params?.dark===true?StyleSheet.flatten(styles.full_dark):StyleSheet.flatten(styles.full_white);
          return (
            <ScrollView style={styles.scrollstyle}>
              <View style={styleNowBackg}>
              <Text style = {styles.alignCent}>Memória Játék</Text>
                  <Button
                    title="Home"
                    onPress={() => navigation.navigate({name:'Home',params:{dark:darkenabled}})}
                  />
                  <Button
                    title="Game"
                    onPress={() => navigation.navigate({name:'Game',params:{dark:darkenabled}})}
                  />
                  <Button
                    title="Options"
                    onPress={() => navigation.navigate({name:'Options',params:{dark:darkenabled}})}
                  />
                  <Button
                    title="More"
                    onPress={() => navigation.navigate({name:'More',params:{dark:darkenabled}})}
                  />
              </View>
            </ScrollView>
          );
        }
        
        function MoreScreen({navigation,route}) {
          const styleNowBackg = route.params?.dark===true?StyleSheet.flatten(styles.full_dark):StyleSheet.flatten(styles.full_white);
          return (
            <ScrollView style={styles.scrollstyle}>
              <View style={styleNowBackg}>
                {navbar(navigation)}
                <View style={styles.container}>
                <Text style = {styles.alignCent}>More</Text>
                  <Text style = {styles.alignCent}>
                    Köszönöm, hogy kipróbáltad a játékot!{"\n"}
                    HA bármilyen észrevételed van,
                    bármiléyen hibába futottál kérlet értesíts az alábbi címen: {"\n"}
                    bonczbe@student.elte.hu
                  </Text>
                </View>
              </View>
            </ScrollView>
          );
        }
        var darkenabled=false;
        function OptionsScreen({navigation,route}) {
          const styleNowBackg = route.params?.dark===true?StyleSheet.flatten(styles.full_dark):StyleSheet.flatten(styles.full_white);    //weben is nyomon követhető a HSUP
          return (
            <ScrollView style={styles.scrollstyle}>
              <View style={styleNowBackg}>

                {navbar(navigation)}

                <View style={styles.container}>
                <Text style = {styles.alignCent}>Options</Text>
                  <Button
                    title="Dark mode"
                    onPress={()=>darkswitcher(navigation)}
                  />
                </View>
              </View>
            </ScrollView>
          );
        }
        function darkswitcher(navigation){
          (darkenabled)?darkenabled=false:darkenabled=true;
          navigation.navigate({name:'Options',params:{dark:darkenabled}});
        }
        const cardimg=[
          {'img': require("./src/images/android.png")},
          {'img': require("./src/images/apple.png")},
          {'img': require("./src/images/doge.png")},
          {'img': require("./src/images/roojustfun.png")},
          {'img': require("./src/images/rooperf.png")},
          {'img': require("./src/images/roosant.png")},
          {'img': require("./src/images/rooswag.png")},
          {'img': require("./src/images/shiba.png")},
          {'img': require("./src/images/troll.png")},
        ]
        const cover = require("./src/images/cover.png")
        const coverr = require("./src/images/troll.png")
        var check= []

        function renderimg(card){
            return (
              <Image
                style={styles.front} 
                source={card.fliped==true?card.img:cover} 
                key={card.id} 
                alt="card" 
                style={{height: 100, width: 100}} 
                resizeMode='contain'
              />
            );
        }

        function GameScreen({navigation,route}) {
          const styleNowBackg = route.params?.dark===true?StyleSheet.flatten(styles.full_dark):StyleSheet.flatten(styles.full_white);
          const [cards, setCards] = useState([])
          let [flag, setFlag] = useState(true)
          let toggleSwitch = () => setFlag(previousState => !previousState);
          const [point, setPoint]= useState([0])
          
        function check2Card(check){
          if(check[1].img==check[0].img){
            check[1].found=true
            check[0].found=true
            addpoint();
          }else{
            check[0].fliped=false
            check[1].fliped=false
          }
        }
        
        function addpoint(){
          var help = point
          help++
          if(help==(cards.length/2))alert("Winner winner chicken dinner!")
          setPoint(help)
        }

          function nullaz(){
            setPoint([0])
          }
          

          const handleClick = (card) => {
            
            if(card.found==true){
              card.fliped=true
            }else{
              if(check.length>0&&check[0].id==card.id){}else{
                check.push(card)
              }
              card.fliped=true
              toggleSwitch()
              if(point==(cards.length/2)-1){
                if(check.length>1){
                  check2Card(check)
                  check=[]
                }
              }else{
                if(check.length>2){
                  check2Card(check)
                  var help = check[2]
                  check=[help]
                }
              }
            }
          }
          const kever = () =>{
            const kevert=[...cardimg, ...cardimg]
            .sort(() => Math.random()-0.5)
            .map((card) => ({...card, id:Math.random(),fliped:false,found:false }))
            
            setCards(kevert)
          }
          return (
            <ScrollView style={styles.scrollstyle}>
              <View style={styleNowBackg}>
                {navbar(navigation)}
                <View style={styles.container}>
                  <Text style = {styles.alignCent}>Game</Text>
                  <Button 
                    title="New Game"
                    onPress={() => {kever(); nullaz()}}
                  />
                  <Text>
                    Points: {point}
                  </Text>
                      <View style={styles.cardgrid}>
                        {cards.map(card=>(
                            <View style={styles.card} key={card.id}>
                              <Pressable 
                                style={styles.front}
                                  onPress={()=>{
                                  handleClick(card);}
                                }
                              >
                                {renderimg(card)}
                              </Pressable>
                          </View>
                        ))}
                      </View>
                </View>
              </View>
            </ScrollView>
          );
        }

        const Stack = createNativeStackNavigator();

        function App() {
          return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="More" component={MoreScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Options" component={OptionsScreen} options={{ headerShown: false }}/>
              </Stack.Navigator>
            </NavigationContainer>
          );
        }

        export default App;


        const styles = StyleSheet.create(
          {
            scrollstyle:{
              height:'100%'
            },
            full_white: {
              alignItems: 'center',
              backgroundColor:'#dbdbdb',
              height:'100%',
              width:'100%'
            },
            full_dark: {
              alignItems: 'center',
              backgroundColor:'#474747',
              height:'100%',
              width:'100%'
            },
            front:{
              margin:1,
              backgroundColor:'lightblue',
              borderColor:'red',
              borderWidth:1
            },
            cardgrid:{
              alignItems:'center',
              flex:1,
              flexDirection:'row',
              flexWrap:'wrap',
              padding:30
            },
            container: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            },
            nav: {
              flexDirection: "row",
            },
            alignCent:{
              textAlign: 'center',
            }
          }
        );
