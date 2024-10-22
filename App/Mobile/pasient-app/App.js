import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from "./NavigationAfterLogin/mainContainer";
import Login from "./Comp/login-page/Login.jsx";
import Test from "./NavigationAfterLogin/Test/Test.jsx";
import WaitingForTheFaceRecognition from "./Comp/WaitingForTheFaceRecognition/WaitingForTheFaceRecognition";
import { Profiles } from "./Comp/profiles.jsx";
import "react-native-get-random-values";
import { View } from "react-native-animatable";
import { getData, removeData } from "./localStorage";
import { enableScreens } from "react-native-screens";
import { LocationProvider } from "./NavigationAfterLogin/Screens/LocationContext";

const LOCATION_TASK_NAME = "background-location-task";

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {

  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientId = await getData("patientId");

        if (typeof patientId === "string" && patientId !== "") {
          setInitialRouteName("mainContainer");
        } else {
          const cookie = await getData("cookie");
          if (typeof cookie === "string" && cookie !== "") {
            setInitialRouteName("Profiles");
          } else {
            setInitialRouteName("Login");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setInitialRouteName("Login");
      }
    };
    fetchData();
  }, []);

  if (!initialRouteName) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profiles" component={Profiles} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen
            name="WaitingPage"
            component={WaitingForTheFaceRecognition}
          />
          <Stack.Screen name="mainContainer" component={MainContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
};

export default App;
