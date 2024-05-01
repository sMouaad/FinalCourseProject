import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  TextInput,
} from 'react-native';





function HomePage({navigation}){
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => 
  {
    setModalVisible(true);
  };

  const closeModal = () => 
  {
    setModalVisible(false);
  };
  
  const alertAdd = () =>
  {
    alert("ADDED");
    closeModal();
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>




        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC", { patientName: "Younes BENSAFIA" })} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Younes BENSAFIA</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC")} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Mouaad Sadi</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC")} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Abderaouf MAHDJOUB</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Home_RTC")} style={styles.patient}><Text style={{fontSize:20, fontWeight:'bold', color:'#fff' }}>Ahmed TEHAR</Text></TouchableOpacity>



















        <TouchableOpacity onPress={openModal} style={{height: 100, width: "100%", backgroundColor: "#fff", marginBottom: 30, borderRadius: 45, alignItems: 'center', justifyContent: 'center', borderWidth:4, borderColor:'#76A523'}}>
          <Image style={{width:60, height:60}} source={require('../../../Images/ajouter.png')}/>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType='slide'
        transparent = {true}
        visible= {modalVisible}
        onRequestClose = {closeModal}
      >
        <View style={{width:'100%', height:'80%', backgroundColor:'rgba(94, 94 , 206 , 0.9)', justifyContent:'center', alignItems:'center', borderRadius:50, borderWidth:5, borderColor:"#76A523"}}>
        <TextInput
          placeholder="Name"
          style={{borderWidth:3, width:'80%', marginBottom: 20, height:60, borderRadius: 30, textAlign: "center", fontSize: 20, fontWeight: 'bold', borderColor:'black', backgroundColor:'white'}}
          secureTextEntry={false}
        />
        <TouchableOpacity placeholder="Date of Birth" style={{borderWidth:3, width:'80%', marginBottom: 5, height:60, borderRadius: 30, borderColor:'black', backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', }}>YYYY/MM/DD</Text>
        </TouchableOpacity>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 4, width: '90%', marginTop:10, borderRadius:30 }} />

        <TextInput
          placeholder="ID Doctor"
          style={{borderWidth:3, height:60, borderRadius: 30, borderWidth:3, marginTop:15 , width:'80%', textAlign: "center", fontSize: 20, fontWeight: 'bold', borderColor:'black', backgroundColor:'white'}}
        />

        <TouchableOpacity onPress={alertAdd} style={{height:50, width:'80%', marginTop: 10,borderWidth: 3, borderColor:'black', borderRadius:25, justifyContent: 'center', alignItems:'center', backgroundColor:'#76A523'}}>
              <Text style={{fontWeight:'bold', fontSize:18, color:'white'}}>ADD</Text>
        </TouchableOpacity>

        </View>
      </Modal>
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
