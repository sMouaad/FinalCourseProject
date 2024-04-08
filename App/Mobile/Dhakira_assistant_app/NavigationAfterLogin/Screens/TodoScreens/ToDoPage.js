import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

function ToDoPage({navigation}){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={()=>navigation.navigate("TodoPatient")} style={{width: '80%', height:69, backgroundColor:'#5E60CE', borderRadius:21, marginBottom:50, alignItems: 'center', justifyContent: 'center', borderWidth:2}}><Image style={{width:60, height:60,position:'absolute',left:10,top:3}} source={require('../../../Images/liste-de-choses-a-faire.png')}/><Text style={{fontSize:24, fontWeight:'bold', color:'white', position:'absolute', left:80}}>To-Do Patients</Text></TouchableOpacity>
    <TouchableOpacity style={{width: '80%', height:69, backgroundColor:'#D9F6FB', borderRadius:21, marginBottom:50, justifyContent: 'center', alignItems: 'center', borderWidth:2}}><Image style={{width:60, height:53.82,position:'absolute',left:10,top:8}} source={require('../../../Images/a-faire.png')}/><Text style={{fontSize:24, fontWeight:'bold', color:'black', position:'absolute', right:60}}>my ToDo list</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate("Rdv")} style={{width: '80%', height:69, backgroundColor:'#1D90A1', borderRadius:21, marginBottom:50, justifyContent: 'center', alignItems: 'center', borderWidth:2}}><Image style={{width:60, height:60,position:'absolute',left:10,top:2}} source={require('../../../Images/calendrier.png')}/><Text style={{fontSize:24, fontWeight:'bold', color:'white', position:'absolute', right:45}}>Appointment</Text></TouchableOpacity>

  </View>
  );
};

export { ToDoPage };
