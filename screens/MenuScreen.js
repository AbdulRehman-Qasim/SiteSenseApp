import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const MenuScreen = ({ navigation }) => {
    const menuItems = [
        { title: "About App", icon: "info", screen: "AboutApp" },
        { title: "Previous Inspections", icon: "chat", screen: "PreviousChat" },
        { title: "My Projects", icon: "folder-open", screen: "MyProjects" },
        { title: "Subscription", icon: "subscriptions", screen: "Subscription" },
        { title: "Help", icon: "help", screen: "Help" },
        { title: "Logout", icon: "logout" },
    ];

    const handlePress = (item) => {
        if (item.title === "Logout") {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Yes", onPress: () => navigation.replace("Login") },
                ]
            );
        } else if (item.screen) {
            navigation.navigate(item.screen);
        }
    };

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navLeft}>
                    <Ionicons name="chevron-back" size={26} color="#EF9C66" />
                </TouchableOpacity>

                {/* Replace text with logo */}
                <Image source={require("../assets/favicon7.png")} style={styles.logoImage} />

                <View style={{ width: 26 }} />
            </View>

            {/* Body */}
            <ScrollView contentContainerStyle={styles.body}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.card,
                            item.title === "Logout" && styles.logoutCard,
                        ]}
                        onPress={() => handlePress(item)}
                    >
                        <MaterialIcons
                            name={item.icon}
                            size={26}
                            color={item.title === "Logout" ? "#FF4D4D" : "#EF9C66"}
                            style={styles.cardIcon}
                        />
                        <Text
                            style={[
                                styles.cardText,
                                item.title === "Logout" && styles.logoutText,
                            ]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    navbar: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 35,
        backgroundColor: '#ffffffff',
        borderBottomWidth: 0.7,
        borderBottomColor: '#bed2d0',
    },
    navLeft: {
        padding: 2,
        marginTop: 8,
        marginBottom: -5,

    },
    logoImage: {
        width: 140,
        height: 40,
        alignSelf: "center",
        marginTop: 13,
        marginBottom: -5,

    },
    body: {
        padding: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fdfdfd",
        borderRadius: 12,
        padding: 20,
        marginBottom: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardIcon: {
        marginRight: 12,
    },
    cardText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
    logoutCard: {
        backgroundColor: "#fdfdfd",
    },
    logoutText: {
        color: "#FF4D4D",
        fontWeight: "bold",
    },
});
