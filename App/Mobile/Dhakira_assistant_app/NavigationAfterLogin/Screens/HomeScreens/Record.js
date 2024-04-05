import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Record() {
    const [backgroundColor, setBackgroundColor] = useState('#F44336');
    const handleButtonPress = () => {
        setBackgroundColor(prevColor => prevColor === '#00000026' ? '#F44336' : '#00000026');
      };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleButtonPress} style={{borderRadius:150, height:300, width:300, backgroundColor:backgroundColor, justifyContent: 'center', alignItems: 'center', borderWidth:3, elevation:1, shadowColor: 'red',marginBottom:20}}>
        <SafeAreaView style={{borderRadius:150, height:150, width:150, backgroundColor: '#F44336', borderWidth:3}}></SafeAreaView>
      </TouchableOpacity>
      <Text style={{fontSize:25, fontWeight:'800', textAlign:'center', color:'#226'}}>Simply <Text style={{color:'#F44336'}}>Tap</Text> the button to activate the camera{'\n'}And{'\n'}start <Text style={{color:'#F44336'}}>Capturing</Text> the patient</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

 

})