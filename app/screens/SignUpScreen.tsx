import React from 'react';
import { ActivityIndicator, Button, ImageBackground, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Props } from '../navigation/types';

const one = (email: string) => {
        return new Promise<string>((resolve, reject) => {
        setTimeout(() =>{
            if(email == "email@email.com")
                reject("rejeitou")
            else
                resolve("resolveu")    
        }, 9000)
    });
}

const SignUpScreen = ({ route, navigation }: Props) => {
    const [email, setEmail] = React.useState("");
    const [isEmailInputFocused, setIsEmailInputFocused] = React.useState(false);
    const [isEmailConfirmed, setIsEmailConfirmed] = React.useState(false);
    const [isEmailTouched, setIsEmailTouched] = React.useState(false);

    const [nome, setNome] = React.useState("");
    const [isNomeInputFocused, setIsNomeInputFocused] = React.useState(false);

    const [phone, setPhone] = React.useState("");
    const [isPhoneInputFocused, setIsPhoneInputFocused] = React.useState(false);

    const [zip, setZip] = React.useState("");
    const [isZipInputFocused, setIsZipInputFocused] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [isPasswordInputFocused, setIsPasswordInputFocused] = React.useState(false);

    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isConfirmPasswordInputFocused, setIsConfirmPasswordInputFocused] = React.useState(false);

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
                    text1: 'erro',
                    text2: e,
                    visibilityTime: 4500                
                })
            })
            .finally(()=>{setIsLoading(false); });
        setIsEmailTouched(true);
    }

    const renderEmailConfirm = () => {
        return(
            <View>
                <View style={{alignItems: "stretch", justifyContent: "flex-start"}}> 
                    <Text style={styles.infoText}>Ao clicar em "continuar" será verificado se o e-mail inserido nunca foi utilizado para o cadastro de uma conta. O endereço de e-mail confirmado será utilizado para entrar no aplicativo.</Text>
                    <TouchableOpacity 
                        style={(regexEmail.test(email) && !isLoading) ? styles.texteEnterButtonEnabled : styles.texteEnterButtonDisabled} 
                        disabled={(!regexEmail.test(email) || isLoading)}
                        onPressIn={confirm_onPressIn}>
                            <Text>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderAccountForm = () =>{
        return(
            <View style={{alignItems: "stretch", justifyContent: "flex-start"}}>
                <Text style={styles.inputText}>
                    Nome
                </Text>
                <View style={styles.emailConfirmSection}>
                    <FontAwesome5 name={"user"} solid size={20} color="gray" style={!isNomeInputFocused ? styles.icon: styles.iconFocused}/>
                    <TextInput
                        style={isNomeInputFocused ? styles.inputEmailFocused : styles.inputEmail}
                        onChangeText={(event) => setNome(event)}
                        value={nome}
                        autoCapitalize={"words"}          
                        onFocus={()=> {setIsNomeInputFocused(true)}}
                        onBlur={()=> {setIsNomeInputFocused(false)}}
                        /> 
                </View>

                <Text style={styles.inputText}>
                    Telefone
                </Text>
                <View style={styles.emailConfirmSection}>
                    <FontAwesome5 name={"phone"} solid size={20} color="gray" style={!isPhoneInputFocused ? styles.icon: styles.iconFocused}/>
                    <TextInput
                        style={isPhoneInputFocused ? styles.inputEmailFocused : styles.inputEmail}
                        onChangeText={(event) => setPhone(event)}
                        value={phone}
                        autoCapitalize={"none"}
                        keyboardType={'phone-pad'}           
                        onFocus={()=> {setIsPhoneInputFocused(true)}}
                        onBlur={()=> {setIsPhoneInputFocused(false)}}
                        /> 
                </View>

                <Text style={styles.inputText}>
                    CEP
                </Text>
                <View style={styles.emailConfirmSection}>
                    <FontAwesome5 name={"globe"} solid size={20} color="gray" style={!isZipInputFocused ? styles.icon: styles.iconFocused}/>
                    <TextInput
                        style={isZipInputFocused ? styles.inputEmailFocused : styles.inputEmail}
                        onChangeText={(event) => setZip(event)}
                        value={zip}
                        autoCapitalize={"none"}
                        keyboardType={'numeric'}            
                        onFocus={()=> {setIsZipInputFocused(true)}}
                        onBlur={()=> {setIsZipInputFocused(false)}}
                        /> 
                </View>

                <Text style={styles.inputText}>
                    Senha
                </Text>
                <View style={styles.emailConfirmSection}>
                    <FontAwesome5 name={"user-lock"} solid size={20} color="gray" style={!isPasswordInputFocused ? styles.icon: styles.iconFocused}/>
                    <TextInput
                        style={isPasswordInputFocused ? styles.inputEmailFocused : styles.inputEmail}
                        onChangeText={(event) => setPassword(event)}
                        value={password}
                        autoCapitalize={"none"}
                        secureTextEntry={true}            
                        onFocus={()=> {setIsPasswordInputFocused(true)}}
                        onBlur={()=> {setIsPasswordInputFocused(false)}}
                        /> 
                </View> 

                <Text style={styles.inputText}>
                    Confirmar senha
                </Text>
                <View style={styles.emailConfirmSection}>
                    <FontAwesome5 name={"user-lock"} solid size={20} color="gray" style={!isConfirmPasswordInputFocused ? styles.icon: styles.iconFocused}/>
                    <TextInput
                        style={isConfirmPasswordInputFocused ? styles.inputEmailFocused : styles.inputEmail}
                        onChangeText={(event) => setConfirmPassword(event)}
                        value={confirmPassword}
                        autoCapitalize={"none"}
                        secureTextEntry={true}            
                        onFocus={()=> {setIsConfirmPasswordInputFocused(true)}}
                        onBlur={()=> {setIsConfirmPasswordInputFocused(false)}}
                        /> 
                </View>        
            </View>
        )
    }    

    return (
        <ScrollView style={styles.container}>
            <View style={{alignItems: "flex-start", justifyContent: "flex-start"}}>
                <Text style={styles.myEmailText}>
                    Meu e-mail é
                </Text>
            </View>
            <View style={{alignItems: "stretch", justifyContent: "flex-start"}}>
                <View style={styles.emailConfirmSection}>
                    {(!isEmailConfirmed && !isEmailTouched) && <FontAwesome5 name={"at"} solid size={20} color="grey" style={!isEmailInputFocused ? styles.icon: styles.iconFocused}/>}
                    {(!isEmailConfirmed && isEmailTouched && !isLoading) && <FontAwesome5 name={"times"} solid size={20} color="red" style={!isEmailInputFocused ? styles.icon: styles.iconFocused}/>}
                    {isEmailConfirmed && <FontAwesome5 name={"check"} solid size={20} color="green" style={!isEmailInputFocused ? styles.icon: styles.iconFocused}/>}
                    <TextInput
                        style={isEmailInputFocused ? styles.inputEmailFocused : styles.inputEmail}
                        onChangeText={(event) => setEmail(event)}
                        value={email}
                        autoCapitalize={"none"}
                        keyboardType={'email-address'} 
                        editable={!isLoading && !isEmailConfirmed}
                        selectTextOnFocus={!isLoading && !isEmailConfirmed}              
                        onFocus={()=> {setIsEmailInputFocused(true)}}
                        onBlur={()=> {setIsEmailInputFocused(false)}}
                    />
                </View>                 
            </View>
            {
                !isEmailConfirmed ? renderEmailConfirm() : renderAccountForm()
            }           
            <View style={{alignItems: "stretch", justifyContent: "flex-end"}}>
                <ActivityIndicator size="large" color="mediumturquoise" animating={isLoading} style={{marginTop: 200}}/>
            </View>            
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 38
    },
    myEmailText: {
        color: 'black',
        fontSize: 32,
        marginBottom: 15,
        paddingTop: 5
    },
    inputEmail: {
        flex: 1,
        height: 50,
        borderBottomWidth: 2,
        padding: 10,
        fontSize: 20,
        marginBottom: 30,
        borderBottomColor: 'black'
    },
    inputEmailFocused: {
        flex: 1,
        height: 50,
        borderBottomWidth: 2,
        padding: 10,
        fontSize: 20,
        marginBottom: 30,
        borderBottomColor: 'mediumturquoise'
    },
    infoText: {
        color: 'gray',
        fontSize: 15,
        textAlign: 'justify'
    },
    texteEnterButtonDisabled: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 12,
        borderRadius: 30,
        marginTop: 30
    },
    texteEnterButtonEnabled: {
        alignItems: 'center',
        backgroundColor: 'mediumturquoise',
        padding: 12,
        borderRadius: 30,
        marginTop: 30
    },
    emailConfirmSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
    icon:{
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginBottom: 30,
    },
    iconFocused:{
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'mediumturquoise',
        marginBottom: 30,
    },
    inputText:{
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    }
  });


export default SignUpScreen;