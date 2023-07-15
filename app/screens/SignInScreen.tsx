import React from 'react';
import { GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import IconTextInput, { IconTextInputConfig } from '../components/IconTextInput';
import Global from '../global/Global';
import { Props } from '../navigation/types';
import User from '../classes/User';
import Toast from 'react-native-toast-message';

const SignInScreen = ({ route, navigation }: Props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    const emailIconTextInputConfig = new IconTextInputConfig();
    emailIconTextInputConfig.icon = "at";
    emailIconTextInputConfig.inputValue = email;
    emailIconTextInputConfig.onInputValueChanged = setEmail;
    emailIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    emailIconTextInputConfig.labelText = "E-mail";
    emailIconTextInputConfig.isLoading = isLoading;
    emailIconTextInputConfig.isEditable = !isLoading;

    const passwordIconTextInputConfig = new IconTextInputConfig();
    passwordIconTextInputConfig.icon = "unlock";
    passwordIconTextInputConfig.inputValue = password;
    passwordIconTextInputConfig.onInputValueChanged = setPassword;
    passwordIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    passwordIconTextInputConfig.labelText = "Senha";
    passwordIconTextInputConfig.isLoading = isLoading;
    passwordIconTextInputConfig.isEditable = !isLoading;

    const signIn_onPress = async (event: GestureResponderEvent) => {
        setIsLoading(true);
        User.authenticate(email, password)
        .then((response) => {
            if(response.success && response.data)
                navigation.navigate("Login");
            if(response.message){
                Toast.show({
                    type: response.message.type,
                    text1: response.message.title,
                    text2: response.message.text
                })
            }       
        })
        .catch((error) => {
            Toast.show({
                type: error.type,
                text1: error.text1,
                text2: error.text2
            })           
        })
        .finally(()=>{
            setIsLoading(false);
        }) 
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={{fontWeight: "bold", fontSize: 24, alignSelf: 'center'}}>
                Boas-vindas de volta!
            </Text>
            <Text style={{marginBottom: 30, alignSelf: 'center'}}>
                Estamos muito animados em te ver novamente!
            </Text>
            <IconTextInput config={emailIconTextInputConfig}/>
            <IconTextInput config={passwordIconTextInputConfig}/>
            <TouchableWithoutFeedback>
                <Text style={{fontWeight: "bold", color: Global.COLOR.MAIN_COLOR}}>
                    Esqueceu sua senha?
                </Text>
            </TouchableWithoutFeedback>
            <TouchableOpacity 
                style={ (!isLoading) ? styles.textEnterButtonEnabled : styles.textEnterButtonDisabled } 
                disabled={ (isLoading)}
                onPress={signIn_onPress}>
                <Text>ENTRAR</Text>
            </TouchableOpacity>
        </ScrollView>        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 25
    },
    textEnterButtonDisabled: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 12,
        borderRadius: 30,
        marginTop: 30
    },
    textEnterButtonEnabled: {
        alignItems: 'center',
        backgroundColor: 'mediumturquoise',
        padding: 12,
        borderRadius: 30,
        marginTop: 30
    }
});

export default SignInScreen;