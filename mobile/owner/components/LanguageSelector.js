// Language Selector Component for Owner App
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ visible, onClose }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Language</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                i18n.language === lang.code && styles.selectedLanguage
              ]}
              onPress={() => changeLanguage(lang.code)}
            >
              <Text style={styles.languageText}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  languageButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  selectedLanguage: {
    backgroundColor: '#f0f0f0'
  },
  languageText: {
    fontSize: 16
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#53a20e',
    borderRadius: 5,
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default LanguageSelector;