import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Button, SafeAreaView, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginPageInterface ()
{
  const Hello = () => {
    console.warn("Login Successfully");
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.Firstcontainer}>
          <SafeAreaView style={styles.Secondcontainer}></SafeAreaView>
        </SafeAreaView>
        <Text style={styles.FirstText}>Login Page!</Text>
        <TextInput placeholder="Entre your Username" style={styles.username}/>
        <TextInput placeholder="Entre your Paswword"  style={styles.inputPassword}  secureTextEntry={true} />
        <Pressable style={styles.loginButton} onPress={Hello}><Text style={styles.TextLoginButton}>Log in</Text></Pressable>
      </SafeAreaView>
    
    </>

  );
}
const styles = StyleSheet.create({
  Firstcontainer:
  {
    marginTop: -200,
    marginBottom: 200,
    width: '90%',
    height: 20,
    backgroundColor: '#6930C3',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Secondcontainer:
  {
    width: '90%',
    height: 8,
    backgroundColor: '#72569D',
    borderRadius: 22,
  },
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputPassword: 
  {
    borderColor: '#6930C3',
    width: 300,
    height: 60,
    borderWidth: 3,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22, 
    textAlign: 'center',
    marginBottom: 20,
  },
  username:
  {
    borderColor: '#6930C3',
    width: 300,
    height: 60,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22, 
    textAlign: 'center'
  },
  loginButton:
  {
    width: 300,
    height: 60,
    borderRadius: 22, 
    backgroundColor: '#6930C3',
    justifyContent: 'center'
    
  },
  TextLoginButton:
  {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  FirstText:
  {
    marginTop: -10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight:'bold',
    color: "#4F278D"
  }
}
);


export {LoginPageInterface};