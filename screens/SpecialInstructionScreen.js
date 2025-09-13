import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const SpecialInstructionScreen = ({ navigation, route }) => {
    const [instructions, setInstructions] = useState("");

    // ✅ get correct props from UploadChecklist
    const { checklistFile, checklistFileName } = route.params || {};

    return (
        <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navLeft}>
                    <Ionicons name="chevron-back" size={26} color="#EF9C66" />
                </TouchableOpacity>
                <Image source={require("../assets/favicon9.png")} style={styles.logoImage} />
                <View style={{ width: 26 }} />
            </View>

            {/* Body */}
            <View style={styles.body}>
                <View style={styles.textAreaWrapper}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Type instructions here..."
                        placeholderTextColor="#999"
                        multiline
                        value={instructions}
                        onChangeText={setInstructions}
                    />

                    {/* Mic Button Inside */}
                    <TouchableOpacity style={styles.micInside}>
                        <FontAwesome5 name="microphone" size={30} color="#00809D" />
                    </TouchableOpacity>
                </View>


                {/* Info Row */}
                <View style={styles.infoRow}>
                    <MaterialIcons name="info-outline" size={25} color="#00809D" />
                    <Text style={styles.infoText}>These instructions will apply to the entire inspection</Text>
                </View>

                {/* Buttons Row */}
                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#00809D" }]}
                        onPress={() => navigation.navigate("UploadChecklist")}
                    >
                        <Text style={styles.btnText1}>Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#EF9C66" }]}
                        onPress={() => {
                            if (instructions.trim() === "") {
                                Alert.alert("Required", "Please enter some instructions before continuing.");
                            } else {
                                // ✅ Pass file info + instructions to Preview
                                navigation.navigate("ChecklistPreview", {
                                    instructions,
                                    checklistFile,
                                    checklistFileName
                                });
                            }
                        }}
                    >
                        <Text style={styles.btnText2}>Save & Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default SpecialInstructionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    navbar: {
        paddingHorizontal: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 45,
        backgroundColor: '#ffffffff',
        borderBottomWidth: 0.7,
        borderBottomColor: '#bed2d0',
    },
    navLeft: {
        padding: 4,
        marginTop: 8,
        marginBottom: 10,
    },
    logoImage: {
        width: 190,
        height: 25,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 15,

    },
    body: {
        flex: 1,
    },
    textAreaWrapper: {
        width: "100%",
        marginTop: 40,
        paddingHorizontal: 20,
        position: "relative", // important for absolute mic positioning
    },

    textArea: {
        height: 250,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        textAlignVertical: "top",
        fontSize: 18,
        backgroundColor: "#fff",
        paddingRight: 45, // extra space so text doesn’t overlap mic
    },

    micInside: {
        position: "absolute",
        right: 30,  // matches paddingHorizontal
        bottom: 20, // sits inside at bottom-right
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 18,
        color: "#444",
        flex: 1,
        flexWrap: "wrap",
        letterSpacing: 1,
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 2,
    },
    btn: {
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 30,
        marginRight: 20,
    },
    btnText1: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    btnText2: {
        color: "#000000ff",
        fontSize: 16,
        fontWeight: "600",
    },
});
