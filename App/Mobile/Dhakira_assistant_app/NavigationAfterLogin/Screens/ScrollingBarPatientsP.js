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

function HomePage({navigation}){
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Abderraouf MAHDJOUB</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Mouaad SADI</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Younes BENSAFIA</Text></TouchableOpacity>
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
    backgroundColor: "#6c5ce7",
    marginBottom: 30,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:4,
    borderColor:'#2d3436'
  }
});

export { HomePage };
