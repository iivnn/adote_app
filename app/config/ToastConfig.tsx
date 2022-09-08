import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}    
      style={{borderLeftColor: 'red'}}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),

  info: (props: any) => (
    <InfoToast
      {...props}    
      style={{borderLeftColor: 'deepskyblue'}}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),

};