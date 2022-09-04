import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Root: undefined;
};
  
export type Props = NativeStackScreenProps<RootStackParamList>;