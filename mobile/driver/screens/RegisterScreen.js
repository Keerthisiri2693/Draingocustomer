// Driver Registration Screen with Detailed Information
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, Picker, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import * as DocumentPicker from 'react-native-document-picker';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    pan: '',
    address: '',
    gst: '',
    vehicleType: 'Tractor',
    vehicleModel: '',
    tankCapacity: '',
    vehicleNumber: '',
    rate: '',
    area: '',
    profilePhoto: null,
    aadharPhoto: null,
    panPhoto: null,
    vehicleDocuments: [],
    isVerified: false,
    membershipPlan: 'basic',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0]) {
        const source = response.assets[0];
        setFormData({ ...formData, [type]: source });
      }
    });
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setFormData({ ...formData, vehicleDocuments: [...formData.vehicleDocuments, ...result] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document picker error: ', err);
        Alert.alert('Error', 'Failed to pick documents');
      }
    }
  };

  const validateForm = () => {
    const { name, phone, aadhar, pan, address, vehicleModel, tankCapacity, vehicleNumber, rate, area } = formData;

    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }

    if (!phone.trim() || phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }

    if (!aadhar.trim() || aadhar.length !== 12) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhar number');
      return false;
    }

    if (!pan.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      Alert.alert('Error', 'Please enter a valid PAN number');
      return false;
    }

    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }

    if (!vehicleModel.trim()) {
      Alert.alert('Error', 'Please enter vehicle model');
      return false;
    }

    if (!tankCapacity || isNaN(tankCapacity) || tankCapacity <= 0) {
      Alert.alert('Error', 'Please enter valid tank capacity');
      return false;
    }

    if (!vehicleNumber.trim()) {
      Alert.alert('Error', 'Please enter vehicle number');
      return false;
    }

    if (!rate || isNaN(rate) || rate <= 0) {
      Alert.alert('Error', 'Please enter valid rate');
      return false;
    }

    if (!area.trim()) {
      Alert.alert('Error', 'Please enter service area');
      return false;
    }

    if (!formData.isVerified) {
      Alert.alert('Error', 'Please verify your documents');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare form data for submission
      const submissionData = { ...formData };

      // Remove file objects for now (in real app, you'd upload files first)
      delete submissionData.profilePhoto;
      delete submissionData.aadharPhoto;
      delete submissionData.panPhoto;
      delete submissionData.vehicleDocuments;

      // Add vehicle type validation
      const maxCapacity = formData.vehicleType === 'Tractor' ? 5000 : 15000;
      if (parseInt(formData.tankCapacity) > maxCapacity) {
        Alert.alert('Error', `${formData.vehicleType} cannot have capacity more than ${maxCapacity}L`);
        setLoading(false);
        return;
      }

      // Call backend API
      const response = await axios.post('http://localhost:3000/api/drivers/register', submissionData);

      if (response.data.success) {
        Alert.alert('Success', 'Registration successful! Please login.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeDocument = (index) => {
    const newDocuments = [...formData.vehicleDocuments];
    newDocuments.splice(index, 1);
    setFormData({ ...formData, vehicleDocuments: newDocuments });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Driver Registration</Text>

      {/* Personal Information Section */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={formData.aadhar}
        onChangeText={(text) => handleInputChange('aadhar', text)}
        keyboardType="number-pad"
        maxLength={12}
      />

      <TextInput
        style={styles.input}
        placeholder="PAN Number"
        value={formData.pan}
        onChangeText={(text) => handleInputChange('pan', text)}
        maxLength={10}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
        multiline
        numberOfLines={3}
      />

      <TextInput
        style={styles.input}
        placeholder="GST Number (Optional)"
        value={formData.gst}
        onChangeText={(text) => handleInputChange('gst', text)}
      />

      {/* Photo Uploads */}
      <Text style={styles.sectionTitle}>Upload Documents</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={() => handleImageUpload('profilePhoto')}>
        <Text style={styles.uploadButtonText}>Upload Profile Photo</Text>
      </TouchableOpacity>
      {formData.profilePhoto && (
        <Text style={styles.uploadedText}>Profile photo uploaded</Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={() => handleImageUpload('aadharPhoto')}>
        <Text style={styles.uploadButtonText}>Upload Aadhar Photo</Text>
      </TouchableOpacity>
      {formData.aadharPhoto && (
        <Text style={styles.uploadedText}>Aadhar photo uploaded</Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={() => handleImageUpload('panPhoto')}>
        <Text style={styles.uploadButtonText}>Upload PAN Photo</Text>
      </TouchableOpacity>
      {formData.panPhoto && (
        <Text style={styles.uploadedText}>PAN photo uploaded</Text>
      )}

      {/* Vehicle Information Section */}
      <Text style={styles.sectionTitle}>Vehicle Information</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.vehicleType}
          onValueChange={(itemValue) => handleInputChange('vehicleType', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tractor (<5000L)" value="Tractor" />
          <Picker.Item label="Truck (<15000L)" value="Truck" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Vehicle Model"
        value={formData.vehicleModel}
        onChangeText={(text) => handleInputChange('vehicleModel', text)}
      />

      <TextInput
        style={styles.input}
        placeholder={`Tank Capacity (L) - Max ${formData.vehicleType === 'Tractor' ? '5000' : '15000'}`}
        value={formData.tankCapacity}
        onChangeText={(text) => handleInputChange('tankCapacity', text)}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Vehicle Number"
        value={formData.vehicleNumber}
        onChangeText={(text) => handleInputChange('vehicleNumber', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Rate per trip"
        value={formData.rate}
        onChangeText={(text) => handleInputChange('rate', text)}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Service Area"
        value={formData.area}
        onChangeText={(text) => handleInputChange('area', text)}
      />

      {/* Vehicle Documents Upload */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
        <Text style={styles.uploadButtonText}>Upload Vehicle Documents (PDF/PNG/JPG)</Text>
      </TouchableOpacity>

      {formData.vehicleDocuments.length > 0 && (
        <View style={styles.documentsContainer}>
          {formData.vehicleDocuments.map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <Text style={styles.documentText}>{doc.name || `Document ${index + 1}`}</Text>
              <TouchableOpacity onPress={() => removeDocument(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Verification Checkbox */}
      <View style={styles.checkboxContainer}>
        <Switch
          value={formData.isVerified}
          onValueChange={(value) => handleInputChange('isVerified', value)}
        />
        <Text style={styles.checkboxLabel}>I verify that all documents are authentic</Text>
      </View>

      {/* Membership Plan */}
      <Text style={styles.sectionTitle}>Membership Plan</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.membershipPlan}
          onValueChange={(itemValue) => handleInputChange('membershipPlan', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Basic (Free)" value="basic" />
          <Picker.Item label="Premium (₹999/year)" value="premium" />
          <Picker.Item label="Enterprise (₹2999/year)" value="enterprise" />
        </Picker>
      </View>

      {/* Active Status Toggle */}
      <View style={styles.checkboxContainer}>
        <Switch
          value={formData.isActive}
          onValueChange={(value) => handleInputChange('isActive', value)}
        />
        <Text style={styles.checkboxLabel}>Available to receive orders</Text>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2c3e50'
  },
  input: {
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 15
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  pickerContainer: {
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  picker: {
    height: 45,
    width: '100%'
  },
  uploadButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  uploadedText: {
    color: '#27ae60',
    marginBottom: 10,
    fontSize: 14
  },
  documentsContainer: {
    marginBottom: 15
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 6,
    marginBottom: 8
  },
  documentText: {
    color: '#2c3e50',
    fontSize: 14
  },
  removeText: {
    color: '#e74c3c',
    fontSize: 14
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: '#2c3e50'
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 15
  },
  loginButtonText: {
    color: '#3498db',
    fontSize: 14,
    textDecorationLine: 'underline'
  }
});

export default RegisterScreen;