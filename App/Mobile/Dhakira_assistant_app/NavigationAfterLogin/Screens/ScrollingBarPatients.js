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

function Scroll(){
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold' }}>Abderraouf MAHDJOUB</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold' }}>Mouaad SADI</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold' }}>Younes BENSAFIA</Text></TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 31,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  patient: {
    height: 136,
    width: "100%",
    backgroundColor: "#D9D9D9",
    marginBottom: 20,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export { Scroll };
