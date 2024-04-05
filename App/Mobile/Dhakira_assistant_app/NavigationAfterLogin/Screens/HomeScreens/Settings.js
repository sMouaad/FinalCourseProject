import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Settings() {
  return (
    
    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
        <View style={styles.Delete}></View>
        <View style={{flexDirection:'row'}}>
            <View style={styles.buttons}></View>
            <View style={styles.buttons}></View>
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={styles.buttons}></View>
            <View style={styles.buttons}></View>
        </View>
        <View style={styles.Delete}></View>
    </View>
  )
}

const styles = StyleSheet.create({

buttons:
{
    backgroundColor:'#fff', width:150,height:150, marginHorizontal: 10, marginVertical:10, borderRadius:31,justifyContent:'center', alignItems: 'center', borderWidth:5, borderColor:'#5E60CE'
},
Delete:
{
    backgroundColor:'#fff', width:310,height:60, marginHorizontal: 10, marginVertical:10, borderRadius:31,justifyContent:'center', alignItems: 'center', borderWidth:5, borderColor:'red'
}

})