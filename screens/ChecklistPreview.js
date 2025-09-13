import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher"; // Android
import { Platform } from "react-native";


export default function ChecklistPreview({ navigation, route }) {
    const { instructions, checklistFile } = route.params || {};
    const [showFullInstructions, setShowFullInstructions] = useState(false);

    // ✅ Extract filename safely
    const checklistFileName =
        checklistFile?.name || (checklistFile?.uri ? checklistFile.uri.split("/").pop() : null);

    // ✅ Handle opening file
    const handleOpenFile = async () => {
        if (checklistFile?.uri) {
            try {
                if (Platform.OS === "android") {
                    await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                        data: checklistFile.uri,
                        flags: 1,
                    });
                } else {
                    await Linking.openURL(checklistFile.uri);
                }
            } catch (error) {
                Alert.alert("Error", "Unable to open file");
            }
        } else {
            Alert.alert("No file", "No checklist file uploaded.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navLeft}>
                    <Ionicons name="chevron-back" size={26} color="#EF9C66" />
                </TouchableOpacity>
                <Image source={require("../assets/favicon10.png")} style={styles.logoImage} />
                <View style={{ width: 26 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Checklist Section */}
                <Text style={styles.sectionHeading}>Checklist</Text>
                <View style={styles.box}>
                    {/* ✅ Heading in orange */}
                    <Text style={[styles.boxHeading, { color: "#EF9C66" }]}>
                        Project Details
                    </Text>
                    {/* ✅ Project name on next line */}
                    <Text style={styles.projectName}>
                        Example Project A {"\n"}
                        File: {checklistFileName || "No file uploaded"}
                    </Text>

                    <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        onPress={handleOpenFile}
                    >
                        <Text style={styles.link}>View Checklist</Text>
                    </TouchableOpacity>
                </View>

                {/* Instructions Section */}
                <Text style={styles.sectionHeading}>Instructions</Text>
                <View style={styles.box}>
                    <Text style={styles.boxContent}>
                        {showFullInstructions
                            ? instructions || "No instructions provided."
                            : (instructions?.slice(0, 50) || "No instructions provided.") + "..."}
                    </Text>
                    <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => setShowFullInstructions(!showFullInstructions)}
                    >
                        <Text style={styles.link}>
                            {showFullInstructions ? "Hide Instructions" : "View Instructions"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Start Inspection Button */}
                <TouchableOpacity style={styles.startBtn} onPress={() => alert("Inspection Started!")}>
                    <Text style={styles.startBtnText}>Start Inspection</Text>
                </TouchableOpacity>

                {/* Replace Checklist Link */}
                <TouchableOpacity
                    style={styles.replaceLink}
                    onPress={() => navigation.navigate("UploadChecklist") }
                >
                    <Text style={styles.replaceLinkText}>Replace Checklist</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc" },
    navbar: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 53,
        backgroundColor: "#fff",
        borderBottomWidth: 0.7,
        borderBottomColor: "#bed2d0",
    },
    navLeft: {
        padding: 4,
        marginTop: 0,
        marginBottom: 10,
    },
    logoImage: {
        width: 170,
        height: 30,
        alignSelf: "center",
        marginTop: 0,
        marginBottom: 15,
        resizeMode: "contain",
    },
    sectionHeading: {
        fontSize: 21,
        fontWeight: "900",
        color: "#00809D",
        marginBottom: 8,
        marginTop: 20,
        marginLeft: 5,
        letterSpacing: 1,
    },
    box: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 40, // bigger size
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1.5,
        borderColor: "#d8d4d4ff",
    },
    boxHeading: {
        fontSize: 20,
        fontWeight: "600",
        color: "#EF9C66",
        marginBottom: 9,
        marginTop: -25,
        letterSpacing: 1,
        marginLeft: -20,
    },
    projectName: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000000ff",
        marginBottom: 6,
        marginLeft: -20,
    },

    boxContent: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
        marginLeft: -20,
        marginTop: -25,
    },
    link: {
        color: "#EF9C66",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 1,
        marginTop: 30,
        marginBottom: -30,
        marginRight: -20,

    },
    startBtn: {
        backgroundColor: "#00809D",
        paddingVertical: 17,
        paddingHorizontal: 28,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 16,
    },
    startBtnText: {
        color: "#f8fafc",
        fontSize: 18,
        fontWeight: "700",
    },
    replaceLink: {
        marginTop: 14,
        alignSelf: "center",
    },
    replaceLinkText: {
        color: "#EF9C66",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 1,
        marginTop: 16,
        marginBottom: -15,
        textDecorationLine: "underline",
    },
});
