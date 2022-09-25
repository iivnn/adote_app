import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Root: undefined;
    Test: undefined;
};
  
export type Props = NativeStackScreenProps<RootStackParamList>;