import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FeatureScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#EF9C66" />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => alert('Language Option')}>
                    <Ionicons name="globe-outline" size={24} color="#00809D" />
                </TouchableOpacity> */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Logo */}
                <Image
                    source={require('../assets/favicon5.png')} // Replace with your logo path
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Key Features */}
                {/* ✨ Key Features */}
                <Text style={styles.sectionHeading}>✨ Key Features</Text>

                <View style={styles.card}>
                    <Text style={styles.cardDescription}>
                        <Text style={{ fontWeight: "bold" }}>⚡ NEC Code Expert</Text> Get instant NEC code summaries and compliance guidance.{"\n\n"}
                        <Text style={{ fontWeight: "bold" }}>🧠 Inspection Assistant</Text>  Upload images to verify NEC compliance and avoid re-inspection delays.{"\n\n"}
                        <Text style={{ fontWeight: "bold" }}>🛠️ Troubleshooting Help</Text>  Describe issues or upload images for step-by-step regulatory guidance.
                    </Text>
                </View>


                {/* 📋 How to Use */}
                <Text style={styles.sectionHeading}>📋 How to Use</Text>

                <View style={styles.card}>
                    <Text style={styles.cardDescription}>
                        <Text style={{ fontWeight: 'bold' }}>🗣️ Ask:</Text> Type your NEC question or upload an image.{"\n\n"}
                        <Text style={{ fontWeight: 'bold' }}>💡 Get Answers:</Text> Receive quick, accurate compliance guidance.{"\n\n"}
                        <Text style={{ fontWeight: 'bold' }}>🔧 Fix & Verify:</Text> Use expert recommendations to correct electrical work.
                    </Text>
                </View>


                {/* 🎯 Benefits */}
                <Text style={styles.sectionHeading}>🎯 Benefits</Text>

                <View style={styles.card}>
                    <Text style={styles.cardDescription}>✅ Ensure your work meets NEC standards effortlessly.{"\n"}</Text>
                    <Text style={styles.cardDescription}>✅ Avoid inspection failures and costly rework.{"\n"}</Text>
                    <Text style={styles.cardDescription}>✅ Save time with instant expert guidance.</Text>
                </View>


            </ScrollView>

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeatureScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    scrollContent: {
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    logo: {
        width: 420,
        height: 80,
        alignSelf: 'left',
        marginVertical: 0,
        marginTop: 30,
        marginBottom: 40,
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: '900',
        color: '#00809D',
        marginTop: 0,
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },

    cardDescription: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00809D',
        marginBottom: 6,
    },
    nextButton: {
        backgroundColor: '#00809D',
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 55,

    },
    nextButtonText: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
