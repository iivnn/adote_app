import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import User from '../classes/User';
import IconTextInput, { IconTextInputConfig } from '../components/IconTextInput';
import Global from '../global/Global';
import { Props } from '../navigation/types';

const SignUpScreen = ({ route, navigation }: Props) => {
    const [email, setEmail] = React.useState("");
    const [isEmailConfirmed, setIsEmailConfirmed] = React.useState(false);
    const [isEmailTouched, setIsEmailTouched] = React.useState(false);

    const [name, setName] = React.useState("");
    const [isNameTouched, setIsNameTouched] = React.useState(false);
    const [isNameValid, setIsNameValid] = React.useState(true);
    const [nameInvalidText, setNameInvalidText] = React.useState("");

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

    const emailIconTextInputConfig_onInputValueChanged = (e: string) =>{
        setEmail(e);
        setIsEmailTouched(false);
    }

    const nameIconTextInputConfig_onInputValueChanged = (e: string) =>{
        setName(e);
        if(isNameTouched){         
            validateName(e);
        }
    } 

    const emailIconTextInputConfig = new IconTextInputConfig();
    emailIconTextInputConfig.icon = "at";
    emailIconTextInputConfig.keyboardType = "email-address";
    emailIconTextInputConfig.inputValue = email;
    emailIconTextInputConfig.onInputValueChanged = emailIconTextInputConfig_onInputValueChanged;
    emailIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    emailIconTextInputConfig.labelFontSize = 30;
    emailIconTextInputConfig.labelText = "Meu e-mail é";
    emailIconTextInputConfig.isLoading = isLoading;
    emailIconTextInputConfig.isEditable = !isEmailConfirmed;
    emailIconTextInputConfig.isValid = isEmailConfirmed;
    emailIconTextInputConfig.isTouched = isEmailTouched;
    emailIconTextInputConfig.invalidIcon = "times";
    emailIconTextInputConfig.invalidIconColor = "red";

    const nameIconTextInputConfig = new IconTextInputConfig();
    nameIconTextInputConfig.icon = "user";
    nameIconTextInputConfig.inputValue = name;
    nameIconTextInputConfig.keyboardType = "visible-password";
    nameIconTextInputConfig.onInputValueChanged = nameIconTextInputConfig_onInputValueChanged;
    nameIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    nameIconTextInputConfig.labelText = "Nome";
    nameIconTextInputConfig.isLoading = isLoading;
    nameIconTextInputConfig.isTouched = isNameTouched;
    nameIconTextInputConfig.isValid = isNameValid;
    nameIconTextInputConfig.invalidText = nameInvalidText;
    nameIconTextInputConfig.isEditable = !isLoading;

    const phoneIconTextInputConfig = new IconTextInputConfig();
    phoneIconTextInputConfig.icon = "phone";
    phoneIconTextInputConfig.keyboardType = "phone-pad";
    phoneIconTextInputConfig.inputValue = phone;
    phoneIconTextInputConfig.onInputValueChanged = setPhone;
    phoneIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    phoneIconTextInputConfig.labelText = "Telefone";
    phoneIconTextInputConfig.isLoading = isLoading;
    phoneIconTextInputConfig.isTouched = isPhoneTouched;

    const zipIconTextInputConfig = new IconTextInputConfig();
    zipIconTextInputConfig.icon = "globe";
    zipIconTextInputConfig.inputValue = zip;
    zipIconTextInputConfig.onInputValueChanged = setZip;
    zipIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    zipIconTextInputConfig.labelText = "CEP";
    zipIconTextInputConfig.isLoading = isLoading;
    zipIconTextInputConfig.keyboardType = "numeric";
    zipIconTextInputConfig.isTouched = isZipTouched;

    const passIconTextInputConfig = new IconTextInputConfig();
    passIconTextInputConfig.icon = "unlock";
    passIconTextInputConfig.inputValue = password;   
    passIconTextInputConfig.onInputValueChanged = setPassword;
    passIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    passIconTextInputConfig.labelText = "Senha";
    passIconTextInputConfig.isPassword = true;
    passIconTextInputConfig.isLoading = isLoading;
    passIconTextInputConfig.isTouched = isPasswordTouched;

    const confirmPassIconTextInputConfig = new IconTextInputConfig();
    confirmPassIconTextInputConfig.icon = "unlock";
    confirmPassIconTextInputConfig.inputValue = confirmPassword;
    confirmPassIconTextInputConfig.onInputValueChanged = setConfirmPassword;
    confirmPassIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    confirmPassIconTextInputConfig.labelText = "Confirmar senha";
    confirmPassIconTextInputConfig.isPassword = true;
    confirmPassIconTextInputConfig.isLoading = isLoading;
    confirmPassIconTextInputConfig.isTouched = isConfirmPasswordTouched;

    const confirm_onPressIn = async () => {
        setIsLoading(true);
        User.isEmailAvailable(email)
        .then((response) => {
            if(response.data)
                setIsEmailConfirmed(true);
            if(response.message){
                Toast.show({
                    type: response.message.typeString,
                    text1: response.message.title,
                    text2: response.message.text,
                })
            }
            setIsEmailTouched(true);        
        })
        .catch((error) => {
            setIsEmailTouched(false);             
        })
        .finally(()=>{
            setIsLoading(false);
        })       
    }
    
    const signUp_onPressIn = async () => {
        setIsNameTouched(true);
        if(!validateName(name)){           
            return;
        }

        const user = new User();
        user.email = email;       
        user.name = name;

        setIsLoading(true);
        user.add()
        .then((response) => {
            if(response.message){
                Toast.show({
                    type: response.message.typeString,
                    text1: response.message.title,
                    text2: response.message.text,
                    visibilityTime: Global.TOAST.DEFAULT_TIME
                });
            }
            if(response.success){
                navigation.navigate("Login");
            }         	      	
        })
        .catch((error) => {

        })
        .finally(() => {
            setIsLoading(false);    
        })
    }

    const validateName = (value: string): boolean =>{
        if(value == ""){          
            setIsNameValid(false);
            setNameInvalidText("Nome é requerido.")
            
            return false;         
        }
        if(value.length > 255){
            setIsNameValid(false);
            setNameInvalidText("Nome não pode ter mais que 255 caracteres.")
            return false;    
        }

        setIsNameValid(true);
        return true;
    }

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
                        style={ (isNameValid && !isLoading) ? styles.textEnterButtonEnabled : styles.textEnterButtonDisabled } 
                        disabled={ (!isNameValid || isLoading) }
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
                <ActivityIndicator size="large" color={Global.COLOR.MAIN_COLOR} animating={isLoading} style={{marginTop: 100}}/>
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