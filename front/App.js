import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StyleSheet, View, ImageBackground } from 'react-native';
import LoginScreen from './src/components/LoginScreen';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  if(isLogged){

  }
  else{
    return (
      <ImageBackground source={require('./src/images/beautiful-pet-portrait-small-dog-cat.jpg')} resizeMode='cover' style={styles.containerLogin} imageStyle={{opacity: 0.3}}>
        <LoginScreen/>
        <StatusBar style="auto" />
      </ImageBackground> 
    )
  }
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
