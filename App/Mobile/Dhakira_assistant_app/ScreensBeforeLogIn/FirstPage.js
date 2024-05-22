import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ButtonCestParti from "../buttons/button_cestParti.js";
import ButtonJaiDejaUnCompte from "../buttons/button_jaiDejaUnCompte.js";

function First_Page({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.dhakiraImage}
        source={require("../Images/DhakiraCool.png")}
      />
      <Text style={styles.textImage}>Dhakira</Text>
      <Text style={styles.textSousImage}>
        La méthode gratuite, amusante et efficace pour t'assister dans tes
        tâches
      </Text>
      <ButtonCestParti
        onPress={() => navigation.navigate("SignUpPage")}
        text={"C'EST PARTI"}
      />
      <ButtonJaiDejaUnCompte
        onPress={() => navigation.navigate("LoginPage")}
        text={"J'AI DEJA UN COMPTE"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textImage: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6930C3",
  },
  textSousImage: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#9E9E9E",
    marginBottom: 252,
  },
  dhakiraImage: {
    width: 200,
    height: 200,
  },
});

export { First_Page };
