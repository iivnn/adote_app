import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './config/ToastConfig';

export default function App() {
  return (   
    <SafeAreaProvider> 
      <Navigation />
      <StatusBar style="auto" />     
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

