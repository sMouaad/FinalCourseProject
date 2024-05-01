import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

export default function EditPatient() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.Firstcontainer} placeholder='Name'>
      
      </TextInput>
      <TextInput style={styles.Firstcontainer} placeholder='Day of the Birth'>
      
      </TextInput>

      <View style={styles.hr}>
      
      </View>
      <TextInput style={styles.Firstcontainer} placeholder='ID of the Doctor'>
      
      </TextInput>
      <TouchableOpacity style={styles.SubmitContainer}>
        <Text style={styles.TextSubmit}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

container:
{
  flex:1, 
  justifyContent:'center', 
  alignItems:'center',
  backgroundColor:'#fff'
},


Firstcontainer:
{
  paddingLeft:20,
  fontWeight:'bold',
  width:"90%",
  height:47,
  marginBottom:10,
  borderRadius: 21,
  borderColor:'black',
  borderWidth:4,
  fontSize:18
},

hr:
{
  width:"50%",
  height:10,
  borderRadius:21,
  marginBottom: 10,
  borderColor:'black',
  borderWidth:4,
  backgroundColor:'#5390D9'
},

SubmitContainer:
{
  display:'flex',
  width:"90%",
  height:47,
  backgroundColor:'#5390D9',
  borderWidth:4,
  marginBottom:10,
  borderRadius: 21,
  justifyContent:'center',
  alignItems:'center'
},

TextSubmit:
{
  color: 'white',
  fontSize:18,
  fontWeight:'bold'
}


})