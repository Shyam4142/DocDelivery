import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

const BasketServiceItem = ({ basketService }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);

  const toggleNotesModal = () => {
    setShowNotesModal(!showNotesModal);
  };

  const closeModal = () => {
    setShowNotesModal(false);
  };

  return (
    <View style={styles.container} >
      <View style={styles.row}>
        <Text style={styles.left} >Type: Checkup</Text>
        <Text style={styles.right}>Service Fee: $20</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.left}>Date: 2/17/2024</Text>
        <Text style={styles.right}>Time: 15:00</Text>
      </View>
      <TouchableOpacity onPress={toggleNotesModal}>
        <Text style={styles.notes}>Notes:</Text>
      </TouchableOpacity>

      <Modal
        visible={showNotesModal}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={closeModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{basketService.notes}</Text>
            <Image source={require('../../../assets/images.jpg')} style={styles.modalImage} />
          </View>
        </TouchableOpacity>
      </Modal>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'darkblue',
    backgroundColor: "#cecfd930",
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  right: {
    marginLeft: 'auto',
    color: "black",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  left: {
    fontSize: 18,
    marginLeft: 25,
    color: "black"
  },
  notes: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: 'blue',
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  courierImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    marginLeft: 'auto',
  },
});

export default BasketServiceItem;