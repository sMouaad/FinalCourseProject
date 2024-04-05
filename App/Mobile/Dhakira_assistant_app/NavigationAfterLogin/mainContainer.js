import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MessagesPage } from './Screens/MessagesPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './Screens/HomeScreens/ScrollingBarPatientsP';
import { Todo } from './Screens/TodoScreens/ScrollingBarPatientsTD';
import { Home_PatientX } from './Screens/HomeScreens/Home_PatientX';
import { ToDoPage } from './Screens/TodoScreens/ToDoPage';
import Record from './Screens/HomeScreens/Record';
import Track from './Screens/HomeScreens/Track';
import Settings from './Screens/HomeScreens/Settings';


const RTC = createNativeStackNavigator();

function  RecordTrackSettingsGroup() {
  return (
    <RTC.Navigator>
      <RTC.Screen name="Home_Patient" component={Home_PatientX} options={{ headerShown: false }}></RTC.Screen>
      <RTC.Screen name="Record" component={Record} options={{headerShown:true}}></RTC.Screen>
      <RTC.Screen name="Track" component={Track} options={{headerShown:true}}></RTC.Screen>
      <RTC.Screen name="Settings" component={Settings} options={{headerShown:true}}></RTC.Screen>
    </RTC.Navigator>
  );
}



const TodoStack = createNativeStackNavigator();


function TodoStackGroup() {
  return(
  <TodoStack.Navigator>
    <TodoStack.Screen name="TodoPage" component={ToDoPage} options={{ headerShown: false }}></TodoStack.Screen>
    <TodoStack.Screen name="TodoPatient" component={Todo} options={{ headerShown: true}}></TodoStack.Screen>
  </TodoStack.Navigator>
  );
}


const HomeStack = createNativeStackNavigator();


function HomeStackGroup() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}></HomeStack.Screen>
      <HomeStack.Screen name="Home_RTC" component={RecordTrackSettingsGroup} options={{ headerShown: false }}></HomeStack.Screen>
    </HomeStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Todo') {
              iconName = focused ? 'checkmark-circle': 'checkmark-circle-outline';
            } else if (route.name == 'Messages')
            {
                iconName = focused ? 'chatbubbles': 'chatbubbles-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4EA8DE',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: { backgroundColor: '#5E60CE' }
        })}
      >
        <Tab.Screen name="Home" component={HomeStackGroup} options={{ headerShown: false }}/>
        <Tab.Screen name="Todo" component={TodoStackGroup} options={{ headerShown: false}}/>
        <Tab.Screen name="Messages" component={MessagesPage} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
}