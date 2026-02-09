import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const RatingScreen = ({ navigation, route }: any) => {
  const { driverName = "Driver", jobId } = route.params || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitRating = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    // TODO: API call
    console.log({
      jobId,
      rating,
      comment,
    });

    navigation.replace("HomeScreen"); // or BookingHistory
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          {/* HEADER */}
          <Text style={styles.title}>Rate Your Experience</Text>
          <Text style={styles.subtitle}>
            How was your service with {driverName}?
          </Text>

          {/* STARS */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={rating >= star ? "star" : "star-outline"}
                  size={36}
                  color={rating >= star ? "#FFC107" : "#CCC"}
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* RATING LABEL */}
          {rating > 0 && (
            <Text style={styles.ratingLabel}>
              {rating === 5
                ? "Excellent"
                : rating === 4
                ? "Very Good"
                : rating === 3
                ? "Good"
                : rating === 2
                ? "Fair"
                : "Poor"}
            </Text>
          )}

          {/* COMMENT BOX */}
          <View style={styles.commentBox}>
            <TextInput
              placeholder="Write your feedback (optional)"
              placeholderTextColor="#999"
              multiline
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
            />
          </View>

          {/* SUBMIT */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              rating === 0 && { opacity: 0.5 },
            ]}
            disabled={rating === 0}
            onPress={submitRating}
          >
            <Text style={styles.submitText}>Submit Rating</Text>
          </TouchableOpacity>

          {/* SKIP */}
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.replace("HomeScreen")}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RatingScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
  },

  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  ratingLabel: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "700",
    color: "#444",
  },

  commentBox: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    padding: 14,
    minHeight: 120,
  },

  commentInput: {
    fontSize: 14,
    color: "#222",
    textAlignVertical: "top",
  },

  submitBtn: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  skipBtn: {
    marginTop: 14,
    alignItems: "center",
  },

  skipText: {
    color: "#666",
    fontWeight: "600",
  },
});
