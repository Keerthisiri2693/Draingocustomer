import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  /* =====================
     LAYOUT
  ====================== */

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  padding: {
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* =====================
     TEXT
  ====================== */

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2C1D',
  },

  subTitle: {
    fontSize: 14,
    color: '#777',
  },

  label: {
    fontSize: 13,
    color: '#666',
  },

  boldText: {
    fontWeight: '700',
    color: '#333',
  },

  /* =====================
     PREMIUM CARD (IMPORTANT)
  ====================== */

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    // Android shadow
    elevation: 5,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  /* =====================
     BUTTONS
  ====================== */

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dangerButtonText: {
    color: colors.danger,
    fontWeight: '600',
  },

  disabledButton: {
    opacity: 0.5,
  },

  /* =====================
     ICON ROW (CALL / CHAT)
  ====================== */

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },

  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  /* =====================
     MAP PLACEHOLDER
  ====================== */

  mapArea: {
    flex: 1,
    backgroundColor: '#EEE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default styles;
