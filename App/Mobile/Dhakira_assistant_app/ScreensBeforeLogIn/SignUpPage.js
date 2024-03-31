import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Button, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation } from '@react-navigation/native';
function SignUpPageInter()
{
  const  navigation = useNavigation();
  return (
    <View>

      <View  style={styles.Firstcontainer}>
        <View  style={styles.ChargingBar}><View style={{width:'100%', height:22, backgroundColor:'#6930C3', borderRadius:8, justifyContent: 'center'}}><View style={{width:'100%', height:12, backgroundColor:'#72569D', borderRadius:8}}></View></View></View>
        <TextInput  style={styles.FirstInputSignUp} placeholder='Enter your First Name' inputMode='text'></TextInput>
        <TextInput  style={styles.InputSignUpPrenom} placeholder='Enter your Last Name' inputMode='text'></TextInput>
        <TextInput  style={styles.InputSignUpS} placeholder=' Enter your Gmail' inputMode='email'></TextInput>
        <TextInput  style={styles.InputSignUpS} placeholder=' Enter your Phone Number' inputMode='tel'></TextInput>
        <TextInput  style={styles.InputSignUpS} placeholder='Password' secureTextEntry={true}></TextInput>
        <TextInput  style={styles.LastInputSignUp} placeholder='Confirm you password' secureTextEntry={true}></TextInput>
        <Text style={styles.TextLogin}>Already have account?, <Text style={{color:'#42b72a', textDecorationLine: 'underline'}} onPress={() => navigation.navigate('LoginPage')}>Login</Text></Text>
        <TouchableOpacity style={styles.NextButton} title><Text style={styles.TextInNButton}>Next</Text></TouchableOpacity>
        
        
      </View>
    </View>


  );
}
const styles = StyleSheet.create({
  Firstcontainer:
  {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop:35,
  },
  NextButton:
  {
    width:"90%",
    height:60,
    backgroundColor: '#6930C3',
    borderRadius: 22,
    justifyContent: 'center'
  },
  TextInNButton:
  {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  ChargingBar:
  {
    width:'90%', 
    height:22, 
    backgroundColor:'#D9D9D9', 
    borderRadius:8,
    marginBottom: '50%',
  },
  InputSignUpPrenom:
  {
    width:"90%",
    height:60,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    fontSize: 20,
    borderColor:'#6930C3',
    textAlign: 'center'
    
  },
  InputSignUpS:
  {
    width:"90%",
    height:60,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor:'#6930C3',
    fontSize: 20,
    textAlign: 'center'
    
  },
  FirstInputSignUp:
  {
    width:"90%",
    height:60,
    borderWidth: 4,
    borderTopLeftRadius: 22,
    borderColor:'#6930C3',
    borderTopRightRadius: 22,
    fontSize: 20,
    textAlign: 'center',
    marginTop:-120
  },
  LastInputSignUp:
  {
    width:"90%",
    height:60,
    borderWidth: 4,
    borderColor:'#6930C3',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  TextLogin:
  {
    width:"90%",
    height:60,
    color:'#6930C3',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
}
);
export {SignUpPageInter}