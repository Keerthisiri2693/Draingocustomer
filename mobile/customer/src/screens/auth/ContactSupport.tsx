import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors"; // adjust path if needed

const ContactSupportScreen = ({ navigation }) => {
  const handleEmail = () => {
    Linking.openURL("mailto:support@example.com");
  };

  const handleCall = () => {
    Linking.openURL("tel:+919876543210");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* 🔝 TOOLBAR */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Contact Support</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* 📜 CONTENT */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.infoText}>
          Need help? Our support team is here to assist you. Reach out to us
          through any of the options below.
        </Text>

        {/* 📧 EMAIL */}
        <TouchableOpacity style={styles.card} onPress={handleEmail}>
          <View style={styles.iconBox}>
            <Ionicons name="mail-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Email Us</Text>
            <Text style={styles.cardSub}>support@example.com</Text>
          </View>
        </TouchableOpacity>

        {/* 📞 PHONE */}
        <TouchableOpacity style={styles.card} onPress={handleCall}>
          <View style={styles.iconBox}>
            <Ionicons name="call-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Call Support</Text>
            <Text style={styles.cardSub}>+91 98765 43210</Text>
          </View>
        </TouchableOpacity>

        {/* 🕒 SUPPORT HOURS */}
        <View style={styles.hoursCard}>
          <Ionicons name="time-outline" size={20} color={colors.gray} />
          <Text style={styles.hoursText}>
            Support Hours: Monday – Saturday, 9:00 AM – 6:00 PM
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactSupportScreen;


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
  },

  infoText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 20,
    lineHeight: 22,
  },

  /* Contact Cards */
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 14,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black,
  },

  cardSub: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },

  /* Support Hours */
  hoursCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },

  hoursText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.gray,
    lineHeight: 20,
  },
});
