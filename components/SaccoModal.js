import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const SaccoModal = ({ saccoName, showModal, setShowModal }) => {
  return (
    <Modal isVisible={showModal} style={styles.modalView} backdropOpacity={0.5}>
      <View style={styles.mainView}>
        <Text style={styles.saccoName}>{saccoName}</Text>
        <Text style={styles.joinText}>Do you want to join this Sacco?</Text>
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "red",
              },
            ]}
            onPress={() => {
              setShowModal(false);
            }}
          >
            <Text style={styles.actionText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "#07b836",
              },
            ]}
          >
            <Text style={styles.actionText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SaccoModal;

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 10,
  },
  mainView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  joinText: {
    fontSize: 16,
  },
  actionSection: {
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  actionButton: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    height: 30,
  },
  actionText: {
    color: "white",
  },
  saccoName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
});
