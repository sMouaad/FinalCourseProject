import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
const App = () => {
  const [button1, setButton1Color] = useState('#00E5BD');
  const [button2, setButton2Color] = useState('rgba(0,0,0,0)');

  const handleClick = () => {
    console.log("younes")
  };

  return (
    <View style={styles.container}>
      <Image style={styles.dhakira} source={require('./Dhakira1.png')} />
      <Text  style={styles.text}>Dhakira</Text>
      <Text  style={styles.text1}>La methode gratuite, fun, et efficace pour t'assister dans tes taches</Text>
      <Pressable style={styles.button} onPress={handleClick}>
        <Text style={styles.text2}>C'EST PARTI !</Text>
      </Pressable>
      <Pressable style={styles.button2} onPress={handleClick}>
        <Text style={styles.text3}>J'AI DEJA UN COMPTE</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00E5BD'
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9E9E9E',
    marginBottom: 252,
  },
  dhakira:
  {
    width: 200,
    height: 200,
  },
  button:{
    borderRadius: 20,
    width: 300,
    height: 67,
    backgroundColor: '#00E5BD',
    justifyContent: 'center',
    marginTop: 19,
  },
  button2:{
    borderWidth: 1,
    borderColor: '#00E5BD',
    borderRadius: 20,
    width: 300,
    height: 67,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    marginTop: 10,
  },  
  text2:
  {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  text3:
  {
    color: '#00E5BD',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default App;