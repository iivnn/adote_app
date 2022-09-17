import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import Global from '../global/Global';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: Global.TOAST.SUCCESS_COLOR}}
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
      style={{borderLeftColor: Global.TOAST.ERROR_COLOR}}
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
      style={{borderLeftColor: Global.TOAST.INFO_COLOR}}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),

};