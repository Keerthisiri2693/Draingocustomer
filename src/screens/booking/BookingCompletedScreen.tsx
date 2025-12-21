import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../../theme/colors';

const BookingCompletedScreen = ({ navigation }: any) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  return (
    <View style={styles.container}>
      {/* Success */}
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.title}>Service Completed</Text>
      <Text style={styles.subTitle}>
        Thank you for using Drain Go
      </Text>

      {/* Rating */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >
            <Text
              style={[
                styles.star,
                rating >= star && styles.starActive,
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback */}
      <TextInput
        placeholder="Write your feedback (optional)"
        style={styles.input}
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />

      {/* Submit */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          rating === 0 && styles.disabledButton,
        ]}
        disabled={rating === 0}
        onPress={() => navigation.replace('Tabs')}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingCompletedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3A2C1D',
  },
  subTitle: {
    fontSize: 13,
    color: '#777',
    marginBottom: 30,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 32,
    color: '#DDD',
    marginHorizontal: 6,
  },
  starActive: {
    color: '#FFC107',
  },
  input: {
    width: '100%',
    height: 90,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  submitText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
