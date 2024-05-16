import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function Todo({navigation}){
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.patient} onPress={() => navigation.navigate('ToDoA')}><View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: '#5FA9D6', borderRadius:45, height:70, width:'100%'}}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Younes BENSAFIA</Text></View></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: '#5FA9D6', borderRadius:45, height:70, width:'100%'}}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Abderraouf MAHDJOUB</Text></View></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: '#5FA9D6', borderRadius:45, height:70, width:'100%'}}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Mouaad SADI</Text></View></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: '#5FA9D6', borderRadius:45, height:70, width:'100%'}}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Aissam BOUKHELKHAL</Text></View></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: '#5FA9D6', borderRadius:45, height:70, width:'100%'}}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Ahmed TEHAR</Text></View></TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor:'#fff'
  },
  scrollView: {
    flexDirection: 'column', 
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 31,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  patient: {
    height: 100,
    width: "100%",
    backgroundColor: "#4EA8DE",
    marginBottom: 30,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:4,
    borderColor:'#ffd700'
  }
});

export { Todo };
