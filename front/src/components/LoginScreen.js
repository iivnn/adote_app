import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { View } from 'react-native-web';

const LoginScreen = () => {

    return (
        <View>
            <h1>Adote app</h1>
            <Form className="d-grid gap-2">           
                <Form.Group controlId="loginControl">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="passwordControl">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>

                <Button variant="primary">
                    Entrar
                </Button>
        </Form>
    </View>        
    );
  }

export default LoginScreen;

  