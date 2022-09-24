import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Props } from '../navigation/types';

const LoginScreen = ({ route, navigation }: Props) => {   
    return (
        <ImageBackground 
            source={require("../assets/images/beautiful-pet-portrait-small-dog-cat.jpg")} 
            resizeMode="cover"
            style={styles.image}
            imageStyle={{opacity: 0.5}}
        >
            <View style={{flex: 4, alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.textLogo}>
                    <FontAwesome5 name={"paw"} brand size={30}/>
                        &nbsp;adote app
                </Text>
            </View>
            <View style={{flex: 2, alignItems: "center", justifyContent: "flex-end"}}>
                <Text style={styles.textWelcome}>
                    Bem-vindo(a) ao aplicativo de adoção de animais de estimação! 👋
                </Text>
                <TouchableOpacity style={styles.texteEnterButton}>
                    <Text>
                        ENTRAR
                    </Text>
                </TouchableOpacity>
                <Text style={styles.texSignUp}>
                    É novo por aqui?&nbsp; 
                    <TouchableWithoutFeedback onPressIn={() => {navigation.navigate("SignUp")} }>
                        <Text style={{fontWeight: "bold", textDecorationLine: "underline"}}>
                            Cadastre-se.
                        </Text>
                    </TouchableWithoutFeedback>
                </Text>
            </View>                           
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    textLogo: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 180
    },
    textWelcome: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 15
    },
    texteEnterButton: {
        width: 380,
        alignItems: 'center',
        backgroundColor: "white",
        padding: 12,
        borderRadius: 30,
        marginBottom: 160
    },
    texSignUp: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 15
    }
  });

export default LoginScreen;