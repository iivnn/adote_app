import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import IconTextInput, { IconTextInputConfig } from '../components/IconTextInput';
import Global from '../global/Global';
import { Props } from '../navigation/types';

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
                disabled={ (isLoading)}>
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