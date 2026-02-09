import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import AppIcon from '../../components/AppIcon';

const EditProfileScreen = ({ navigation }: any) => {
  const [name, setName] = useState('Praveen Kumar');
  const [phone] = useState('+91 70929 35675');
  const [email, setEmail] = useState('praveen@email.com');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  /* 🎬 ANIMATION VALUES */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  /* 🖼 PICK IMAGE */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  /* 🧾 VALIDATION */
  const validate = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = 'Invalid email address';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 💾 SAVE */
  const handleSave = () => {
    if (!validate()) return;
    Alert.alert('Profile Updated', 'Your profile details have been saved.');
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon type="ion" name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* AVATAR */}
        <Animated.View
          style={[
            styles.avatarSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatar}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImg} />
              ) : (
                <AppIcon type="ion" name="person-outline" size={40} color={colors.primary} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* FORM */}
        <Animated.View
          style={[
            globalStyles.card,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            icon="person-outline"
            error={errors.name}
          />

          <Divider />

          <Input
            label="Phone Number"
            value={phone}
            icon="call-outline"
            editable={false}
          />

          <Divider />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            icon="mail-outline"
            keyboardType="email-address"
            error={errors.email}
          />
        </Animated.View>

        {/* SAVE */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

/* ---------- COMPONENTS ---------- */

const Input = ({
  label,
  value,
  onChangeText,
  icon,
  keyboardType = 'default',
  editable = true,
  error,
}: any) => (
  <View style={styles.inputRow}>
    <View style={styles.inputLeft}>
      <View style={styles.iconCircle}>
        <AppIcon type="ion" name={icon} size={18} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>

    <TextInput
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      keyboardType={keyboardType}
      style={[
        styles.input,
        !editable && styles.disabledInput,
        error && styles.errorBorder,
      ]}
    />

    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F9FB' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },

  container: { padding: 16 },

  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },

  avatarImg: { width: '100%', height: '100%' },

  changePhotoBtn: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  changePhotoText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },

  inputRow: { paddingVertical: 14 },

  inputLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },

  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: { fontSize: 13, fontWeight: '600', color: '#666' },

  input: { fontSize: 15, color: '#222', paddingVertical: 4 },

  disabledInput: { color: '#AAA' },

  errorBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.danger,
  },

  errorText: { fontSize: 12, color: colors.danger, marginTop: 4 },

  divider: { height: 1, backgroundColor: '#EEE' },

  saveBtn: {
    marginTop: 28,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  saveText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
