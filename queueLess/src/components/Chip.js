import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from '../styles';

export default function Chip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[s.chip, active && s.chipActive]}
    >
      <Text style={[s.chipText, active && s.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}