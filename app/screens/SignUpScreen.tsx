import React from 'react';
import { ActivityIndicator, Button, ImageBackground, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';
import IconTextInput, { IconTextInputConfig } from '../components/IconTextInput';
import Global from '../global/Global';
import { Props } from '../navigation/types';

const one = (email: string) => {
        return new Promise<string>((resolve, reject) => {
        setTimeout(() =>{
            if(email == "email@email.com")
                reject("rejeitou")
            else
                resolve("resolveu")    
        }, 1000)
    });
}

const SignUpScreen = ({ route, navigation }: Props) => {
    const [email, setEmail] = React.useState("");
    const [isEmailConfirmed, setIsEmailConfirmed] = React.useState(false);
    const [isEmailTouched, setIsEmailTouched] = React.useState(false);

    const [name, setName] = React.useState("");
    const [isNameTouched, setIsNameTouched] = React.useState(false);

    const [phone, setPhone] = React.useState("");
    const [isPhoneTouched, setIsPhoneTouched] = React.useState(false);

    const [zip, setZip] = React.useState("");
    const [isZipTouched, setIsZipTouched] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [isPasswordTouched, setIsPasswordTouched] = React.useState(false);

    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);

    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    const confirm_onPressIn = async () => {
        console.log("clicou")
        setIsLoading(true);  
        var promise = one(email);
        await promise.then(() => setIsEmailConfirmed(true))
            .catch((e)=>{ 
                Toast.show({
                    type: 'error',
                    text1: Date.now().toString(),
                    text2: "E-mail ja utilizado. awd a asef asef asef asef ase fas efase f",
                    visibilityTime: 6000,

                })
                Toast
            })
            .finally(()=>{setIsLoading(false); });
        setIsEmailTouched(true);
    }
    
    const signUp_onPressIn = async () => {
        setIsNameTouched(true);
        setIsPhoneTouched(true);
        setIsZipTouched(true);
        setIsPasswordTouched(true);
        setIsConfirmPasswordTouched(true);

    }

    const emailIconTextInputConfig = new IconTextInputConfig();
    emailIconTextInputConfig.icon = "at";
    emailIconTextInputConfig.keyboardType = "email-address";
    emailIconTextInputConfig.inputValue = email;
    emailIconTextInputConfig.onInputValueChanged = setEmail;
    emailIconTextInputConfig.inputBorderBottomColorOnFocus = Global.Color.MAIN_COLOR;
    emailIconTextInputConfig.labelFontSize = 30;
    emailIconTextInputConfig.labelText = "Meu e-mail é";
    emailIconTextInputConfig.isLoading = isLoading;
    emailIconTextInputConfig.isEditable = !isEmailConfirmed;
    emailIconTextInputConfig.isValid = isEmailConfirmed;
    emailIconTextInputConfig.isTouched = isEmailTouched;
    emailIconTextInputConfig.invalidIcon = "at";
    emailIconTextInputConfig.invalidIconColor = "black";

    const nameIconTextInputConfig = new IconTextInputConfig();
    nameIconTextInputConfig.icon = "user";
    nameIconTextInputConfig.inputValue = name;
    nameIconTextInputConfig.keyboardType = "visible-password";
    nameIconTextInputConfig.onInputValueChanged = setName;
    nameIconTextInputConfig.inputBorderBottomColorOnFocus = Global.Color.MAIN_COLOR;
    nameIconTextInputConfig.labelText = "Nome";
    nameIconTextInputConfig.isLoading = isLoading;
    nameIconTextInputConfig.isTouched = isNameTouched;

    const phoneIconTextInputConfig = new IconTextInputConfig();
    phoneIconTextInputConfig.icon = "phone";
    phoneIconTextInputConfig.keyboardType = "phone-pad";
    phoneIconTextInputConfig.inputValue = phone;
    phoneIconTextInputConfig.onInputValueChanged = setPhone;
    phoneIconTextInputConfig.inputBorderBottomColorOnFocus = Global.Color.MAIN_COLOR;
    phoneIconTextInputConfig.labelText = "Telefone";
    phoneIconTextInputConfig.isLoading = isLoading;
    phoneIconTextInputConfig.isTouched = isPhoneTouched;

    const zipIconTextInputConfig = new IconTextInputConfig();
    zipIconTextInputConfig.icon = "globe";
    zipIconTextInputConfig.inputValue = zip;
    zipIconTextInputConfig.onInputValueChanged = setZip;
    zipIconTextInputConfig.inputBorderBottomColorOnFocus = Global.Color.MAIN_COLOR;
    zipIconTextInputConfig.labelText = "CEP";
    zipIconTextInputConfig.isLoading = isLoading;
    zipIconTextInputConfig.keyboardType = "numeric";
    zipIconTextInputConfig.isTouched = isZipTouched;

    const passIconTextInputConfig = new IconTextInputConfig();
    passIconTextInputConfig.icon = "unlock";
    passIconTextInputConfig.inputValue = password;   
    passIconTextInputConfig.onInputValueChanged = setPassword;
    passIconTextInputConfig.inputBorderBottomColorOnFocus = Global.Color.MAIN_COLOR;
    passIconTextInputConfig.labelText = "Senha";
    passIconTextInputConfig.isPassword = true;
    passIconTextInputConfig.isLoading = isLoading;
    passIconTextInputConfig.isTouched = isPasswordTouched;

    const confirmPassIconTextInputConfig = new IconTextInputConfig();
    confirmPassIconTextInputConfig.icon = "unlock";
    confirmPassIconTextInputConfig.inputValue = confirmPassword;
    confirmPassIconTextInputConfig.onInputValueChanged = setConfirmPassword;
    confirmPassIconTextInputConfig.inputBorderBottomColorOnFocus = Global.Color.MAIN_COLOR;
    confirmPassIconTextInputConfig.labelText = "Confirmar senha";
    confirmPassIconTextInputConfig.isPassword = true;
    confirmPassIconTextInputConfig.isLoading = isLoading;
    confirmPassIconTextInputConfig.isTouched = isConfirmPasswordTouched;

    const renderEmailConfirm = () => {
        return(
            <View>
                <View style={{alignItems: "stretch", justifyContent: "flex-start"}}> 
                    <Text 
                        style={{        
                            color: 'gray',
                            fontSize: 15,
                            textAlign: 'justify',
                            marginTop: 10
                        }}>
                            Ao clicar em "continuar" será verificado se o e-mail inserido nunca foi utilizado para o cadastro de uma conta. O endereço de e-mail confirmado será utilizado para entrar no aplicativo.
                    </Text>
                    <TouchableOpacity 
                        style={ (regexEmail.test(email) && !isLoading) ? styles.textEnterButtonEnabled : styles.textEnterButtonDisabled } 
                        disabled={ (!regexEmail.test(email) || isLoading) }
                        onPressIn={confirm_onPressIn}>
                            <Text>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderAccountForm = () =>{
        return(
            <View>
                <IconTextInput config={nameIconTextInputConfig}/>
                <IconTextInput config={phoneIconTextInputConfig}/>
                <IconTextInput config={zipIconTextInputConfig}/>
                <IconTextInput config={passIconTextInputConfig}/>
                <IconTextInput config={confirmPassIconTextInputConfig}/>
                <TouchableOpacity 
                        style={ (regexEmail.test(email) && !isLoading) ? styles.textEnterButtonEnabled : styles.textEnterButtonDisabled } 
                        disabled={ (!regexEmail.test(email) || isLoading) }
                        onPressIn={signUp_onPressIn}>
                            <Text>CADASTRAR</Text>
                    </TouchableOpacity>
            </View>
        )
    }    

    return (
        <ScrollView style={styles.container}>
            <IconTextInput config={emailIconTextInputConfig}/>
            {
                !isEmailConfirmed ? renderEmailConfirm() : renderAccountForm()
            }           
            <View style={{alignItems: "stretch", justifyContent: "flex-end"}}>
                <ActivityIndicator size="large" color={Global.Color.MAIN_COLOR} animating={isLoading} style={{marginTop: 100}}/>
            </View>            
        </ScrollView >
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


export default SignUpScreen;