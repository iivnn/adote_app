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
    const [isPhoneValid, setIsPhoneValid] = React.useState(true);
    const [phoneInvalidText, setPhoneInvalidText] = React.useState("");

    const [password, setPassword] = React.useState("");
    const [isPasswordTouched, setIsPasswordTouched] = React.useState(false);
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);
    const [passwordInvalidText, setPasswordInvalidText] = React.useState(""); 

    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const regexPhone = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/);

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

    const phoneIconTextInputConfig_onInputValueChanged = (e: string) =>{
        setPhone(e);       
        validatePhone(e);       
    }

    const passIconTextInputConfig_onInputValueChanged = (e: string) =>{
        setPassword(e);       
        validatePassword(e, confirmPassword);        
    }

    const confirmPassIconTextInputConfig_onInputValueChanged = (e: string) =>{
        setConfirmPassword(e);       
        validatePassword(password, e);        
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
    emailIconTextInputConfig.autoCapitalize = 'none';

    const nameIconTextInputConfig = new IconTextInputConfig();
    nameIconTextInputConfig.icon = "user";
    nameIconTextInputConfig.inputValue = name;
    nameIconTextInputConfig.keyboardType = "visible-password";
    nameIconTextInputConfig.onInputValueChanged = nameIconTextInputConfig_onInputValueChanged;
    nameIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    nameIconTextInputConfig.labelText = "Apelido";
    nameIconTextInputConfig.isLoading = isLoading;
    nameIconTextInputConfig.isTouched = isNameTouched;
    nameIconTextInputConfig.isValid = isNameValid;
    nameIconTextInputConfig.invalidText = nameInvalidText;
    nameIconTextInputConfig.isEditable = !isLoading;

    const phoneIconTextInputConfig = new IconTextInputConfig();
    phoneIconTextInputConfig.icon = "phone";
    phoneIconTextInputConfig.keyboardType = "phone-pad";
    phoneIconTextInputConfig.inputValue = phone;
    phoneIconTextInputConfig.onInputValueChanged = phoneIconTextInputConfig_onInputValueChanged;
    phoneIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    phoneIconTextInputConfig.labelText = "Telefone (opcional)";
    phoneIconTextInputConfig.isLoading = isLoading;
    phoneIconTextInputConfig.isTouched = isPhoneTouched;
    phoneIconTextInputConfig.isValid = isPhoneValid;
    phoneIconTextInputConfig.invalidText = phoneInvalidText;
    phoneIconTextInputConfig.isEditable = !isLoading;

    const passIconTextInputConfig = new IconTextInputConfig();
    passIconTextInputConfig.icon = "unlock";
    passIconTextInputConfig.inputValue = password;   
    passIconTextInputConfig.onInputValueChanged = passIconTextInputConfig_onInputValueChanged;
    passIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    passIconTextInputConfig.labelText = "Senha";
    passIconTextInputConfig.isPassword = true;
    passIconTextInputConfig.isLoading = isLoading;
    passIconTextInputConfig.isTouched = isPasswordTouched;
    passIconTextInputConfig.isPassword = true;
    passIconTextInputConfig.isValid = isPasswordValid;
    passIconTextInputConfig.invalidText = passwordInvalidText;
    phoneIconTextInputConfig.isEditable = !isLoading;

    const confirmPassIconTextInputConfig = new IconTextInputConfig();
    confirmPassIconTextInputConfig.icon = "unlock";
    confirmPassIconTextInputConfig.inputValue = confirmPassword;
    confirmPassIconTextInputConfig.onInputValueChanged = confirmPassIconTextInputConfig_onInputValueChanged;
    confirmPassIconTextInputConfig.inputBorderBottomColorOnFocus = Global.COLOR.MAIN_COLOR;
    confirmPassIconTextInputConfig.labelText = "Confirmar senha";
    confirmPassIconTextInputConfig.isPassword = true;
    confirmPassIconTextInputConfig.isLoading = isLoading;
    confirmPassIconTextInputConfig.isPassword = true;
    confirmPassIconTextInputConfig.isEditable = !isLoading;

    const confirm_onPressIn = async () => {
        setIsLoading(true);
        User.isEmailAvailable(email)
        .then((response) => {
            if(response.data)
                setIsEmailConfirmed(true);
            if(response.message){
                Toast.show({
                    type: response.message.type,
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
        const phoneValid = validatePhone(phone);
        const nameValid = validateName(name);
        const passValid = validatePassword(password, confirmPassword);

        if(!phoneValid || !nameValid || !passValid)
            return;

        const user = new User();
        user.email = email;       
        user.name = name;
        user.password = password;
        user.phoneNumber = phone;

        setIsLoading(true);
        user.add()
        .then((response) => {
            if(response.message){
                Toast.show({
                    type: response.message.type,
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

    const validateName = (value: string) =>{
        setIsNameTouched(true);
        if(value == ""){          
            setIsNameValid(false);
            setNameInvalidText("Apelido é requerido.")
            return false;        
        }

        if(value.length > 50){          
            setIsNameValid(false);
            setNameInvalidText("Apelido não pode conter mais que 50 caracteres.");
            return false;                 
        }

        setIsNameValid(true);
        return true;
    }

    const validatePhone = (value: string) =>{
        if(value == ""){
            setIsPhoneValid(true);
            setIsPhoneTouched(false);
            return true;
        }
        setIsPhoneTouched(true);
        if(!regexPhone.test(value)){
            setIsPhoneValid(false);
            setPhoneInvalidText("Telefone inválido.")
            return false;   
        }

        setIsPhoneValid(true);
    }

    const validatePassword = (value: string, confirm: string) =>{
        setIsPasswordTouched(true);
        if(value == ""){
            setIsPasswordValid(false);
            setPasswordInvalidText("Senha é requerido.")
            return false;
        }
        if(value.length < 6){
            setIsPasswordValid(false);
            setPasswordInvalidText("Senha não pode conter menos que 6 caracteres.")
            return false;   
        }
        if(value.length > 25){
            setIsPasswordValid(false);
            setPasswordInvalidText("Senha não pode conter mais que 25 caracteres.")
            return false;   
        }
        if(value != confirm){
            setIsPasswordValid(false);
            setPasswordInvalidText("Senhas divergentes.")
            return false;   
        }

        setIsPasswordValid(true);
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
                <IconTextInput config={passIconTextInputConfig}/>
                <IconTextInput config={confirmPassIconTextInputConfig}/>
                <TouchableOpacity 
                        style={ (isNameValid && !isLoading) ? styles.textEnterButtonEnabled : styles.textEnterButtonDisabled } 
                        disabled={ (!isNameValid || !isPhoneValid || !isPasswordValid || isLoading)}
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