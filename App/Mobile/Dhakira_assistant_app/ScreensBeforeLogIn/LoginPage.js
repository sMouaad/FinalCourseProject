import React from 'react';
import {Text, StyleSheet, Pressable, View, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation } from '@react-navigation/native';

function LoginPageInterface ()
{
  const  navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.Firstcontainer}>
          <View style={styles.Secondcontainer}></View>
        </View>

        <TextInput placeholder="Enter your Username" style={styles.username}/>
        <TextInput placeholder="Enter your Paswword"  style={styles.inputPassword}  secureTextEntry={true} />
        <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('Main')}><Text style={styles.TextLoginButton}>Log in</Text></TouchableOpacity>
        <Text style={{ color: '#6930C3' , fontWeight: 'bold', marginTop:10, fontSize:20}}>You don't have account?, <Text style={{color:'#42b72a', textDecorationLine: 'underline'}} onPress={() => navigation.navigate('SignUpPage')}>Sign Up.</Text></Text>
      </View>
    
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
    width: "90%",
    height: 60,
    borderWidth: 4,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22, 
    textAlign: 'center',
    marginBottom: 20,
    fontSize:20
  },
  username:
  {
    borderColor: '#6930C3',
    width: "90%",
    height: 60,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22, 
    textAlign: 'center',
    fontSize:20
  },
  loginButton:
  {
    width: "90%",
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