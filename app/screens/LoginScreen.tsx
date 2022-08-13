import React from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { View, Text, StyleSheet } from 'react-native';

export default function LoginScreen(){
    return (
        <View>
            <Text style={styles.title} >Adote app</Text>

            <FloatingLabel style={styles.label} controlId="floatingLogin" label="Login" className="mb-3">
                <Form.Control style={styles.form} type="email" placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel style={styles.label} controlId="floatingPassword" label="Senha" className="mb-3">
                <Form.Control style={styles.form} type="password" placeholder="Password" />
            </FloatingLabel>

            <Button style={styles.button} variant="outline-light">
                Entrar
            </Button>
        </View>        
    );
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        marginBottom: 10,
        color: 'white',
        fontSize: 20,
        fontFamily: 'cursive',
    },
    label: {
        color: 'white',
        fontFamily: 'cursive',
    },
    form: {
        opacity: 0.2
    },
    button: {
        fontFamily: 'cursive',
    }
  });