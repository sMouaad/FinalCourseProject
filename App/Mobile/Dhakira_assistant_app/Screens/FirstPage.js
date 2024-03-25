import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ButtonCestParti from '../buttons/button_cestParti.js';
import ButtonJaiDejaUnCompte from '../buttons/button_jaiDejaUnCompte.js';

function First_Page({navigation})
{
    return (
      <View  style={styles.container}>
        <Image style={styles.dhakiraImage} source={require('../Dhakira1.png')} />
        <Text  style={styles.textImage}>Dhakira</Text>
        <Text  style={styles.textSousImage}>La methode gratuite, fun, et efficace pour t'assister dans tes taches</Text>
        <ButtonCestParti onPress={() => navigation.navigate('SignUpPage')} text={"C'EST PARTI"}/>
        <ButtonJaiDejaUnCompte onPress = {() => navigation.navigate('LoginPage')} text ={"J'AI DEJA UN COMPTE"}/>
      </View>

    );
}
const styles = StyleSheet.create({
  container:
  {
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
}
);


export{First_Page};