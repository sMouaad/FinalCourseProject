import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import ButtonCestParti from './buttons/button_cestParti.js';
import ButtonJaiDejaUnCompte from './buttons/button_jaiDejaUnCompte.js';
const App = () => {

  const handleClick = () => {
    console.warn("C'EST PARTI CLICKED");
  };
  
  const handleClick2 = () => {
    console.warn("J'AI DEJA UN COMPTE CLICKED");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.dhakiraImage} source={require('./Dhakira1.png')} />
      <Text  style={styles.textImage}>Dhakira</Text>
      <Text  style={styles.textSousImage}>La methode gratuite, fun, et efficace pour t'assister dans tes taches</Text>
      <ButtonCestParti onPress={handleClick} text={"C'EST PARTI"}/>
      <ButtonJaiDejaUnCompte onPress = {handleClick2} text ={"J'AI DEJA UN COMPTE"}/>
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
  textImage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6930C3'
  },
  textSousImage: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9E9E9E',
    marginBottom: 252,
  },
  dhakiraImage:
  {
    width: 200,
    height: 200,
  },
  
});

export default App;