import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const chats = [
  { id: '1', name: 'Site Safety Audit', date: 'August 5, 2025', time: '11:45 AM' },
  { id: '2', name: 'Quality Assurance Check', date: 'August 4, 2025', time: '03:20 PM' },
  { id: '3', name: 'Equipment Checklist', date: 'August 3, 2025', time: '10:10 AM' },
  { id: '4', name: 'Daily Site Inspection', date: 'August 2, 2025', time: '09:00 AM' },
  { id: '5', name: 'Material Delivery QA', date: 'August 1, 2025', time: '02:30 PM' },
];

const PreviousChatScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatDate}>{item.date}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.chatTime}>{item.time}</Text>
        <TouchableOpacity onPress={() => alert('Delete functionality coming soon!')}>
          <Entypo name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#EF9C66" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Previous Inspertions</Text>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    <Image
      source={require('../assets/favicon.png')}
      style={styles.profileIcon}
    />
  </TouchableOpacity> */}
      </View>


      {/* Container */}
      <View style={styles.container}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // applies only to content
  },
  navbar: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 57,
    backgroundColor: '#ffffffff',
    borderBottomWidth: 0.7,
    borderBottomColor: '#bed2d0',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // works in RN 0.71+, otherwise use marginLeft in navTitle
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00809D',
    marginLeft: 90,
  },
  // profileIcon: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 15,
  // },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  leftSection: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  chatDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chatTime: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
});

export default PreviousChatScreen;
