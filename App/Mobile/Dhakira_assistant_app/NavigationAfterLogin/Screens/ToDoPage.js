import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Button, TouchableOpacity} from 'react-native';


function ToDoPage()
{
    return (
      <View  style={styles.container}>
        <Text>ToDo Page!</Text>
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
  textSousImage: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9E9E9E',
    marginBottom: 252,
  },
}
);


export{ToDoPage};