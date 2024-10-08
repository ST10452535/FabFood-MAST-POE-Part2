import React, { useState, useContext, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import { ChefAuthCon } from '../ChefAuthCon';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useContext(ChefAuthCon);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('Home'); // Use replace to prevent going back to the login screen
        }
    }, [isAuthenticated, navigation]);

    const loginHandle = () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }
        login(username, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/logo-login.png')} 
                style={styles.logo}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
            />
            <Button title="Login" onPress={loginHandle} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 11,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        height: 300,
        width: 300,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 12,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5, 
    },
});

export default LoginScreen;
