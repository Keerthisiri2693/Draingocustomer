import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* 🔝 TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Privacy Policy</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📜 CONTENT */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.updatedText}>Last updated: Jan 2026</Text>

        <Text style={styles.heading}>1. Introduction</Text>
        <Text style={styles.text}>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          application.
        </Text>

        <Text style={styles.heading}>2. Information We Collect</Text>
        <Text style={styles.text}>
          We may collect personal details such as your name, phone number,
          address, and usage information to provide and improve our services.
        </Text>

        <Text style={styles.heading}>3. How We Use Your Information</Text>
        <Text style={styles.text}>
          • To provide and maintain our services{"\n"}
          • To communicate with you{"\n"}
          • To improve app performance and user experience
        </Text>

        <Text style={styles.heading}>4. Data Security</Text>
        <Text style={styles.text}>
          We implement industry-standard security measures to protect your data.
          However, no method of transmission over the internet is 100% secure.
        </Text>

        <Text style={styles.heading}>5. Third-Party Services</Text>
        <Text style={styles.text}>
          We may use third-party services that collect information used to
          identify you, in accordance with their privacy policies.
        </Text>

        <Text style={styles.heading}>6. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to access, update, or delete your personal
          information at any time by contacting our support team.
        </Text>

        <Text style={styles.heading}>7. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page.
        </Text>

        <Text style={styles.heading}>8. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us
          at support@example.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* Toolbar */
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  toolbarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },

  /* Content */
  container: {
    padding: 16,
    paddingBottom: 24,
  },

  updatedText: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 16,
  },

  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginTop: 20,
    marginBottom: 6,
  },

  text: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray,
  },
});
