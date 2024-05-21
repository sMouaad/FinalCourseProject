import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function Settings({ navigation, patientName }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.PatientName}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {patientName}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("SettingsFamily")}
        style={styles.buttons}
      >
        <Image
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 100,
          }}
          source={require("../../../Images/doute.png")}
        />
        <Text style={styles.buttonText}>Family & Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SettingsEdit")}
        style={styles.buttons}
      >
        <Image
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 100,
          }}
          source={require("../../../Images/crayon.png")}
        />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Delete}>
        <Text style={styles.DeleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#fff",
    width: 150,
    height: 170,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#5E60CE",
  },
  Delete: {
    backgroundColor: "#fff",
    marginTop: 80,
    width: 310,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "red",
  },
  PatientName: {
    backgroundColor: "#5E60CE",
    width: 310,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#000",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  DeleteText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
});
