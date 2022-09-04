import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import Colors from './ColorConfig';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: Colors.success}}
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
      style={{borderLeftColor: Colors.danger}}
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
      style={{borderLeftColor: Colors.info}}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),

};