import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Main'); 
        }, 5000); 

        return () => clearTimeout(timer); 
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo-splash-screen.png')} 
                style={styles.logo}
            />
            <Text style={styles.title}>Fabulous Food</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SplashScreen;
