import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const EditProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [mobileNumber, setMobileNumber] = useState('');
    const [supplies, setSupplies] = useState('');
    const [electricians, setElectricians] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) return;

                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setFullName(data.fullName || '');
                    setEmail(data.email || '');
                    setCountryCode(data.countryCode || '+1');
                    setMobileNumber(data.mobileNumber || '');
                    setSupplies(data.supplies || '');
                    setElectricians(data.electricians || '');
                    setImage(data.profileImageUrl || null);
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return;

            let imageUrl = image;

            // Upload image if it's a new local file
            if (image && image.startsWith('file://')) {
                const storage = getStorage();
                const imageRef = ref(storage, `profileImages/${currentUser.uid}.jpg`);
                const img = await fetch(image);
                const bytes = await img.blob();
                await uploadBytes(imageRef, bytes);
                imageUrl = await getDownloadURL(imageRef);
            }

            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                fullName,
                email,
                countryCode,
                mobileNumber,
                supplies,
                electricians,
                profileImageUrl: imageUrl || null
            });

            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => navigation.navigate('Profile') }
            ]);

        } catch (error) {
            console.log('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile.');
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header - No container padding here */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chevron-back" size={24} color="#EF9C66" />
                </TouchableOpacity>
                <Text style={[styles.navTitle, { alignItems: 'center' }]}>Edit Profile</Text>
            </View>
            {/* Everything else inside padded container */}
            <View style={styles.container}>
                {/* Profile Picture */}
                <View style={styles.imageContainer}>
                    <Image
                        source={image ? { uri: image } : require('../assets/favicon.png')}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.uploadIcon} onPress={pickImage}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Input Fields */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.phoneRow}>
                        <TextInput
                            style={[styles.input, styles.codeInput]}
                            value={countryCode}
                            onChangeText={setCountryCode}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={[styles.input, styles.numberInput]}
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <Text style={styles.label}>Where do you get your supplies?</Text>
                    <TextInput style={styles.input} value={supplies} onChangeText={setSupplies} />

                    <Text style={styles.label}>Number of Electricians</Text>
                    <TextInput style={styles.input} value={electricians} onChangeText={setElectricians} keyboardType="numeric" />
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8fafc',
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#ddd',
        marginTop: 30,
        backgroundColor: '#ffffffff',
        borderBottomWidth: 0.7,
        borderBottomColor: '#bed2d0',
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 130,
        justifyContent:'center',
        color:'#00809D',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    uploadIcon: {
        position: 'absolute',
        bottom: 0,
        right: 135,
        backgroundColor: '#00809D',
        padding: 5,
        borderRadius: 20,
    },
    inputSection: {
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        color: 'black',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    phoneRow: {
        flexDirection: 'row',
        gap: 10,
    },
    codeInput: {
        flex: 1,
    },
    numberInput: {
        flex: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 15,
        paddingVertical: 20,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#EF9C66',
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#00809D',
        marginLeft: 10,
    },
    cancelText: {
        fontSize: 17,
        color: '#000',
        fontWeight: '600',
    },
    saveText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '600',
    },
});
