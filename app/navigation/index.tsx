import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { RootStackParamList } from "./types";

export default function Navigation() {
    return (
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>     
    );
  }

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator> 
        {/* <Stack.Screen name="Test" component={Testcreen} options={{ headerShown: false }} />*/}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShadowVisible: false, title: '' }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShadowVisible: false, title: '' }} />
        <Stack.Screen name="Root" component={RootStackScreen} options={{ headerShown: true}} />     
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootStackParamList>();

function RootStackScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
      </Tab.Navigator>
    );
}