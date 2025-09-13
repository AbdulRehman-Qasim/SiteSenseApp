import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    BackHandler
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';



const HomeHelpScreen = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    // Track keyboard visibility
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            alert('Image uploaded!');
        }
    };

    // Handle Android back button only for this screen
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    'Exit App',
                    'Are you sure you want to quit the app?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'OK', onPress: () => BackHandler.exitApp() }
                    ]
                );
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [])
    );



    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.navLeft}>
                    <Ionicons name="menu" size={28} color="#EF9C66" />
                </TouchableOpacity>

                <Image
                    source={require('../assets/favicon6.png')} // replace with your actual path
                    style={styles.navLogo}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person-circle-sharp" size={36} color="#EF9C66" />
                </TouchableOpacity>
            </View>

            {/* Keyboard Avoiding part */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -30}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Added backgroundColor here to fix keyboard pop-up gap */}
                    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
                        {/* Body */}
                        <View style={styles.body}>
                            {/* Large logo (only when keyboard is hidden) */}
                            {!keyboardVisible && (
                                <Image
                                    source={require('../assets/favicon.gif')}
                                    style={{
                                        width: 420,
                                        height: 300,
                                        marginBottom: 30,
                                        marginTop: -40,
                                    }}
                                    contentFit="contain"
                                    autoPlay
                                />
                            )}

                            <Text style={styles.heading}>Welcome Inspector!</Text>
                            <Text style={[styles.subtext, { textAlign: 'center' }]}>
                                Upload your checklist or let me generate
                                one for you. I’ll guide you through each
                                question step by step.
                            </Text>

                            {/* Buttons */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('UploadChecklist')}>
                                    <Text style={styles.button1Text}>Upload Checklist</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('HomeHelp')}>
                                    <Text style={styles.button2Text}>Generate Checklist</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bottom Input */}
                        <View style={styles.inputWrapper}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="Send message..."
                                    value={message}
                                    onChangeText={setMessage}
                                />

                                {message.trim().length === 0 ? (


                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {/* Voice icon */}
                                        <TouchableOpacity onPress={() => alert('Voice input coming soon!')} style={{ marginRight: 10 }}>
                                            <MaterialIcons name="mic" size={28} color="#00809D" />
                                        </TouchableOpacity>

                                        {/* Image picker icon */}
                                        <TouchableOpacity onPress={openImagePicker}>
                                            <Ionicons name="add-circle-outline" size={28} color="#EF9C66" />
                                        </TouchableOpacity>
                                    </View>



                                ) : (
                                    <TouchableOpacity onPress={() => alert('Sending message...')}>
                                        <Ionicons name="send" size={24} color="#00809D" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
        marginBottom: -10,
    },
    navbar: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 45,
        backgroundColor: '#ffffffff',
        borderBottomWidth: 0.7,
        borderBottomColor: '#bed2d0',
    },
    navTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 90,
    },
    heading: {
        fontSize: 28,
        fontWeight: '900',
        fontFamily: 'Helvetica Neue',
        letterSpacing: 1.5,
        color: '#000000ff',
        marginBottom: 10,
    },

    subtext: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 70,
        lineHeight: 20,
        paddingLeft: 30,
        paddingRight: 30,

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    button1: {
        backgroundColor: '#00809D',
        flex: 1,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: '0 9px 6px rgba(0, 0, 0, 0.1)',
    },
    button2: {
        flex: 1,
        backgroundColor: '#EF9C66',
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: '0 9px 6px rgba(0, 0, 0, 0.1)',
    },
    button1Text: {
        color: '#f8fafc',
        fontWeight: 'bold',
        fontSize: 16,
    },
    button2Text: {
        color: '#000000ff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputWrapper: {
        padding: 5,
        backgroundColor: '#f8fcfdff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c2b6b6ff',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginTop: -70,
        marginBottom: 37,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    // ✅ Added logo styles
    navLogo: {
        width: 140,
        height: 30,
        resizeMode: 'contain',
    },

});

export default HomeHelpScreen;
