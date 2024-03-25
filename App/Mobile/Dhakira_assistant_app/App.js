import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ButtonCestParti from './buttons/button_cestParti.js';
import ButtonJaiDejaUnCompte from './buttons/button_jaiDejaUnCompte.js';
import { LoginPageInterface } from './Screens/LoginPage.js';
import { SignUpPageInter } from './Screens/SignUpPage.js';
import { First_Page } from './Screens/FirstPage.js';



const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
} 

const App = () => {

  return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{initialRouteName:"LoginPage", headerShown: false }}>
        <Stack.Screen name="Home" component={First_Page}/>
        <Stack.Screen name="SignUpPage" component={SignUpPageInter}/>
        <Stack.Screen name="LoginPage" component={LoginPageInterface}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


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


export default App;