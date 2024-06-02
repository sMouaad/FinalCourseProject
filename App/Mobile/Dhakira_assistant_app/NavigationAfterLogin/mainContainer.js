import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./Screens/HomeScreens/ScrollingBarPatientsP";
import { Todo } from "./Screens/TodoScreens/ScrollingBarPatientsTD";
import { Home_PatientX } from "./Screens/HomeScreens/Home_PatientX";
import Track from "./Screens/HomeScreens/Track";
import Settings from "./Screens/Settings/Settings";
import UserSettings from "./Screens/UserSettings";
import ToDoPageAssistantDoctor from "./Screens/TodoScreens/ToDoPage";
import EditPatient from "./Screens/Settings/EditPatient";
import FamilyFace from "./Screens/Settings/FamilyFace";
import MessagesStack from "./Screens/Chat/StackMsg";

const SettingsStack = createNativeStackNavigator();
function SettingsStackGroup({ patientName }) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsA" options={{ headerShown: false }}>
        {(props) => {
          return <Settings {...props} patientName={patientName} />;
        }}
      </SettingsStack.Screen>
      <SettingsStack.Screen
        name="SettingsEdit"
        component={EditPatient}
        options={{ headerShown: false, title: "Edit Patient" }}
      />
      <SettingsStack.Screen
        name="SettingsFamily"
        component={FamilyFace}
        options={{ headerShown: false, title: "Recognize Faces" }}
      />
    </SettingsStack.Navigator>
  );
}

const RTC = createNativeStackNavigator();

function RecordTrackSettingsGroup({ route }) {
  const { patientName } = route.params || {}; // Handle the case where route.params is undefined

  return (
    <RTC.Navigator>
      <RTC.Screen
        name="Home_Patient"
        options={{
          headerShown: false,
        }}
      >
        {(props) => {
          return <Home_PatientX {...props} patientName={patientName} />;
        }}
      </RTC.Screen>
      <RTC.Screen
        name="Track"
        component={Track}
        options={{ headerShown: false }}
      ></RTC.Screen>
      <RTC.Screen name="Settings" options={{ headerShown: false }}>
        {(props) => {
          return <SettingsStackGroup {...props} patientName={patientName} />;
        }}
      </RTC.Screen>
    </RTC.Navigator>
  );
}

const TodoStack = createNativeStackNavigator();

function TodoStackGroup() {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen
        name="TodoPage"
        component={Todo}
        options={{ headerShown: false }}
      ></TodoStack.Screen>
      <TodoStack.Screen
        name="ToDoA"
        component={ToDoPageAssistantDoctor}
        options={{ headerShown: true, title: "To-Do Patient" }}
      ></TodoStack.Screen>
    </TodoStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="Home_RTC"
        component={RecordTrackSettingsGroup}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ToDo") {
            iconName = focused ? "checkmark" : "checkmark-outline";
          } else if (route.name == "Messages") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name == "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#bcbdff",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { height: 60, backgroundColor: "#5E60CE" },
      })}
      className="bg-[#bcbdff]"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ToDo"
        component={TodoStackGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={UserSettings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
