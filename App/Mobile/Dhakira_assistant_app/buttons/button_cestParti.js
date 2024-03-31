import React from 'react';
import {Text, StyleSheet, Pressable, View, TouchableOpacity} from 'react-native';

const ButtonCestParti = ({onPress, text}) => {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </>

    )
}


const styles = StyleSheet.create({
    button:{
        borderRadius: 20,
        width: 300,
        height: 67,
        backgroundColor: '#6930C3',
        justifyContent: 'center',
        marginTop: 19,
      },
    text:
    {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
}
)
export default ButtonCestParti;