import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'bootstrap/dist/css/bootstrap.min.css';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isLogged, setIsLogged] = useState(false);

  if (!isLoadingComplete) {
    return null;
  } else {
    if(isLogged){
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    }else{
      return (
        <ImageBackground source={require('./assets/images/beautiful-pet-portrait-small-dog-cat.jpg')} resizeMode='cover' style={styles.containerLogin} imageStyle= 
        {{opacity:0.5}}>
          <LoginScreen/>
          <StatusBar style="auto" />
        </ImageBackground> 
      )
    }
  }
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});