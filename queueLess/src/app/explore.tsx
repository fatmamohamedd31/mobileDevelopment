
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Linking } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>
        Discover QueueLess features
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Find Nearby Branches</Text>
        <Text style={styles.description}>
          Discover service branches near your location.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live Queue Updates</Text>
        <Text style={styles.description}>
          Check waiting times before visiting a branch.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Best Time to Visit</Text>
        <Text style={styles.description}>
          Plan your visit when queues are shorter.
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL('https://docs.expo.dev')}
      >
        <Text style={styles.buttonText}>Expo Documentation</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FFF5F8',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D63384',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F5D5E2',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  button: {
    backgroundColor: '#D63384',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
