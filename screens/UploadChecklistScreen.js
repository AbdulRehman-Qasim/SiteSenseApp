import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native"; // ✅ Added Modal
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export default function UploadChecklistScreen({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [checklistFileName, setChecklistFileName] = useState(null);
  const [checklistFile, setChecklistFile] = useState(null);

  // 📂 File Picker
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/json",
          "text/csv",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setChecklistFile(file);           // ✅ save whole file object
        setChecklistFileName(file.name);
        setSelectedFile(file);
      }

    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }
    setShowModal(true);
  };

  const handleChoice = (choice) => {
    setShowModal(false);
    // when navigating
    if (choice === "no") {
      navigation.navigate("ChecklistPreview", {
        checklistFile,                  // ✅ full file object
        checklistFileName,
      });
    } else {
      navigation.navigate("SpecialInstruction", {
        checklistFile,
        checklistFileName,
      });
    }

  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navLeft}>
          <Ionicons name="chevron-back" size={26} color="#EF9C66" />
        </TouchableOpacity>
        <Image source={require("../assets/favicon8.png")} style={styles.logoImage} />
        <View style={{ width: 26 }} />
      </View>

      {/* Upload Box */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
        <Ionicons name="cloud-upload-outline" size={60} color="#EF9C66" />
        <Text style={styles.uploadText}>Click to Select the File</Text>
        <Text style={styles.supportedText}>
          Supported formats: Word, PDF, Excel, JSON
        </Text>
        {selectedFile && (
          <Text style={styles.fileName}>
            Selected File: {selectedFile.name}
          </Text>
        )}
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button1]} onPress={pickFile}>
          <Text style={styles.buttonText1}>Replace File</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
          <Text style={styles.buttonText2}>Submit Checklist</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Box */}
      <Modal transparent={true} visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Do you want to add any special instructions for this inspection?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.choiceBtn, { backgroundColor: "#00809D" }]}
                onPress={() => handleChoice("yes")}
              >
                <Text style={styles.choiceText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceBtn, { backgroundColor: "#EF9C66" }]}
                onPress={() => handleChoice("no")}
              >
                <Text style={styles.choiceText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


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
    width: 160,
    height: 40,
    alignSelf: "center",
    marginTop: 13,
    marginBottom: -5,
  },
  uploadBox: {
    marginTop: 140,
    borderWidth: 2,
    borderColor: "#bed2d0",
    borderRadius: 12,
    padding: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#00809D",
    letterSpacing: 1,
  },
  supportedText: {
    marginTop: 6,
    fontSize: 17,
    color: "#777",
    textAlign: "center",
  },
  fileName: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    fontSize: 15,
    fontWeight: "500",
    color: "#00809D",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  button1: {
    backgroundColor: '#00809D',
    flex: 1,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4, // ✅ replaced boxShadow
  },
  button2: {
    flex: 1,
    backgroundColor: '#EF9C66',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4, // ✅ replaced boxShadow
  },
  buttonText1: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText2: {
    color: '#000000ff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,         // reduced padding so content isn’t centered
    borderRadius: 12,
    elevation: 5,
    justifyContent: "space-between", // pushes text to top, buttons to bottom
    minHeight: 200,      // keeps size consistent
  },

  modalText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 1.5,
    textAlign: "left",   // align to top-left
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end", // align buttons to bottom-right
    marginTop: 20,
    marginBottom: 10,
  },

  choiceBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginLeft: 10, // spacing between Yes/No
  },

  choiceText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

});
