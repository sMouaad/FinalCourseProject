import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

function PatientPage({ navigation })
{
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate("Patients")} style={{width: '80%', height:69, backgroundColor:'#5E60CE', borderRadius:21, marginBottom:50, alignItems: 'center', justifyContent: 'center'}}><Image style={{width:60, height:60,position:'absolute',left:10,top:3}} source={require('../../Images/1.png')}/><Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>Patients</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={{width: '80%', height:69, backgroundColor:'#4EA8DE', borderRadius:21, marginBottom:50, justifyContent: 'center', alignItems: 'center'}}><Image style={{width:60, height:53.82,position:'absolute',left:10,top:8}} source={require('../../Images/2.png')}/><Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>Discussion</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Track")} style={{width: '80%', height:69, backgroundColor:'#63889E', borderRadius:21, justifyContent: 'center', alignItems: 'center'}}><Image style={{width:60, height:53.82,position:'absolute',left:10,top:3}} source={require('../../Images/3.png')}/><Text style={{fontSize:24, fontWeight:'bold', color:'white'}}>Track</Text></TouchableOpacity>
    </View>
  );
}

export{PatientPage};
