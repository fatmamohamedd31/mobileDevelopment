import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#147D85',
  background: '#F7F2EC',
  surface: '#FFFFFF',
  cardTint: '#D8EEEE',
  text: '#20272B',
  muted: '#78898C',
  border: '#E4DDD7',
  accent: '#F2A43A',
  success: '#D9F0E7',
  danger: '#F9DCD5',
  inactive: '#D8D8DC',
};

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },

  pad: {
    padding: 16,
    paddingBottom: 40,
  },

  h1: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    color: colors.text,
  },

  h2: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 8,
    color: colors.muted,
    letterSpacing: 1.5,
  },

  big: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 4,
    color: colors.text,
  },

  bold: {
    fontWeight: '600',
    color: colors.text,
  },

  muted: {
    color: colors.muted,
  },

  tip: {
    marginBottom: 6,
    color: colors.text,
    lineHeight: 21,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  time: {
    width: 48,
    color: colors.muted,
  },

  min: {
    width: 40,
    textAlign: 'right',
    fontWeight: '600',
    color: colors.text,
  },

  barBg: {
    flex: 1,
    height: 12,
    backgroundColor: colors.cardTint,
    borderRadius: 6,
    overflow: 'hidden',
  },

  bar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  chipText: {
    color: colors.text,
  },

  chipTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },

  btn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    marginTop: 14,
  },

  btnText: {
    color: colors.surface,
    fontWeight: '700',
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.border,
  },

  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },

  tabText: {
    color: colors.muted,
  },

  sectionLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 22,
    marginBottom: 8,
  },

  settingRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  settingDescription: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 19,
  },

  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  notificationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.cardTint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },

  notificationText: {
    flex: 1,
    lineHeight: 22,
  },

  horizontalList: {
    marginTop: 8,
  },

  emptyText: {
    color: colors.muted,
    lineHeight: 21,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  
  visitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  visitDetails: {
    flex: 1,
    paddingRight: 12,
  },
  
  cancelText: {
    color: colors.primary,
    fontWeight: '700',
  },
});