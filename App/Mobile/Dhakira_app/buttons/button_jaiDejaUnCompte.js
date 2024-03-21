import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

const ButtonJaiDejaUnCompte = ({onPress, text}) => {
    return (
        <>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </>

    )



}

const styles = StyleSheet.create({
    button:{
        borderWidth: 1,
        borderColor: '#6930C3',
        borderRadius: 20,
        width: 300,
        height: 67,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        marginTop: 10,
      },
    text:
    {
        color: '#6930C3',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    }, 

})
export default ButtonJaiDejaUnCompte;