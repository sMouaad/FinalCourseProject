import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function SignUpPageInter()
{
  return (
    <View  style={styles.container}>
      <Text>SignUp_Page</Text>
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
export {SignUpPageInter}