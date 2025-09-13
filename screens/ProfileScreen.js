import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView, Alert,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; // ✅ Make sure db is imported


const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setUser({
              name: data.fullName || 'No name provided',
              email: data.email || currentUser.email,
              company: 'Not set',
              profilePic: data.profileImageUrl || 'https://via.placeholder.com/150',
            });
          } else {
            console.log('No user document found.');
          }
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Show loading until user data is ready
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Navbar - Separate from container */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name="chevron-back" size={24} style={{ marginBottom: -5 }} color="#EF9C66" />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { marginBottom: -5 }]}>My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <MaterialCommunityIcons name="pencil-circle" size={30} style={{ marginBottom: -5 }} color="#EF9C66" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Info */}
        <Image
          source={{ uri: user?.profilePic }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.company}>{user?.company}</Text>

        {/* Cards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.cardLeft}>
            <Ionicons name="person-circle-sharp" size={27} color="#EF9C66" />
            <Text style={styles.cardText}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#EF9C66" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.card} onPress={() => console.log('Subscription')}>
          <View style={styles.cardLeft}>
            <MaterialIcons name="subscriptions" size={20} color="#00809D" />
            <Text style={styles.cardText}>Subscription & Plans</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#00809D" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('PreviousChat')}>
          <View style={styles.cardLeft}>
            <Entypo name="chat" size={20} color="#00809D" />
            <Text style={styles.cardText}>Chat History</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#00809D" />
        </TouchableOpacity> */}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutCard}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'No', style: 'cancel' },
                {
                  text: 'Yes',
                  onPress: () => {
                    signOut(auth)
                      .then(() => navigation.replace('Login'))
                      .catch((error) => console.error('Error signing out: ', error));
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <View style={styles.cardLeft}>
            <MaterialIcons name="logout" size={27} color="red" />
            <Text style={[styles.cardText, { color: 'red' }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );


};



export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#ddd',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#dad2d2ff",
    backgroundColor: "#fff",
  },

  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00809D',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginTop: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  company: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  logoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
    marginTop: 20, // your custom addition
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});

