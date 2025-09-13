import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';


const SplashScreen = () => {
    const navigation = useNavigation();

    const handleGetStarted = () => {
        navigation.navigate('Feature'); // or 'Login' depending on the flow you choose
    };

    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/favicon4.png')} // ✅ Put your logo image in assets folder
                style={styles.logoImage} // You will define this style below
                resizeMode="contain"
            />
            {/* <Text style={styles.title}>SiteSense</Text>
            <Text style={styles.subtitle}>From Inspection to Report — Instantly</Text> */}

            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    // title: {
    //     fontSize: 28,
    //     fontWeight: 'bold',
    //     color: '#00809D',
    //     marginBottom: 10,
    //     marginTop: 390,
    // },
    // subtitle: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     color: '#333',
    //     marginBottom: 100,
    // },

    logoImage: {
        width: 600,   // adjust as needed
        height: 500,   // adjust as needed
        alignSelf: 'center',
        marginTop: 150,
        marginBottom: 60, // if you want space below
        marginRight: 20,
    },

    button: {
        backgroundColor: '#00809D',
        paddingVertical: 20,
        paddingHorizontal: 90, // ⬅️ Increased horizontal padding
        borderRadius: 10,
        marginTop: 50,
        alignItems: 'center',
    },

    buttonText: {
        color: '#f8fafc',
        fontWeight: '700',
        fontSize: 17,
        letterSpacing: 3, // ⬅️ Add space between letters
    },

});
