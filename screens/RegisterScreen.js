import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; 
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !fullName || !acceptPolicy) {
      alert('Please fill all fields and accept the policy.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update auth profile name
      await updateProfile(user, { displayName: fullName });

      // Save user to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        phone,
        region,
        createdAt: serverTimestamp(),
      });

      // ✅ Send email verification
      await sendEmailVerification(user);

      Alert.alert(
        'Verify Your Email',
        'A verification link has been sent to your email. Please verify before logging in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ],
        { cancelable: false }
      );

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={styles.navLeft}
        >
          <Ionicons name="chevron-back" size={24} color="#EF9C66" />
        </TouchableOpacity>
        <Text style={styles.heading}>Sign Up</Text>
      </View>

      {/* Logo */}
      <Image source={require('../assets/favicon5.png')} style={styles.logo} />

      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Welcome back, please enter your details.</Text>

      {/* Profile Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="photo-camera" size={30} color="#888" />
          </View>
        )}
      </TouchableOpacity>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Region */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          placeholder="Region"
          value={region}
          onChangeText={setRegion}
          style={styles.input}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="gray" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#00809D"
          />
        </TouchableOpacity>
      </View>

      {/* Accept Policy */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={acceptPolicy}
          onValueChange={setAcceptPolicy}
          color={acceptPolicy ? '#00809D' : undefined}
          style={styles.checkbox}
        />
        <Text style={styles.policyText}>I accept the company policy</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupBtn} onPress={handleRegister}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account */}
      <Text style={styles.loginRedirect}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 50, // Move entire screen up (adjust if needed)
  },
  logo: {
    width: 400,
    height: 70,
    alignSelf: 'left',
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 20,

  },

  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 2,
    marginBottom: 20,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // use marginLeft on heading if RN version <0.71
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00809D',
    marginLeft: 140,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 25,
  },

  // Input field container with icon on left
  inputContainer: {
    flexDirection: 'row', // icon on left
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,

  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,

  },
  checkboxIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#00809D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  policyText: {
    marginLeft: 8,
    fontSize: 14,
  },

  signupBtn: {
    backgroundColor: '#00809D',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
  },
  loginRedirect: {
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 20,


  },
  loginLink: {
    color: '#00809D',
    fontWeight: 'bold',
  },

  imagePicker: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -15,

  },

  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
