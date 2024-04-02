import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function MessagesPage()
{
    return (
      <View  style={styles.container}>
        <Text>Messages Page!</Text>
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
}
);


export{MessagesPage};