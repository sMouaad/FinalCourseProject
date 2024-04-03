import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomePage } from './Screens/HomePage';
import { ToDoPage } from './Screens/ToDoPage';
import { MessagesPage } from './Screens/MessagesPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home_Patient } from './Screens//HomeScreens/Home_Patients';
import { Chats } from './Screens//HomeScreens/Home_Chats';
import Home_Track from './Screens/HomeScreens/Home_Track';

const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}></HomeStack.Screen>
      <HomeStack.Screen name="Patients" component={Home_Patient}></HomeStack.Screen>
      <HomeStack.Screen name="Chat" component={Chats}></HomeStack.Screen>
      <HomeStack.Screen name="Track" component={Home_Track}></HomeStack.Screen>
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
        <Tab.Screen name="Todo" component={ToDoPage} options={{ headerShown: false }}/>
        <Tab.Screen name="Messages" component={MessagesPage} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
}