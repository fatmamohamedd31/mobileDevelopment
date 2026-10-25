
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>QueueLess</Text>
      <Text style={styles.subtitle}>
        Know when to go.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Welcome to QueueLess!</Text>
        <Text style={styles.description}>
          Spend less time waiting and more time doing what matters.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>What would you like to do?</Text>

      <Pressable style={styles.card} onPress={() => router.push('/explore')}>
        <Text style={styles.cardTitle}>Find a Branch</Text>
        <Text style={styles.description}>
          Explore service locations and compare waiting times.
        </Text>
        <Text style={styles.link}>Explore branches →</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live Queue</Text>
        <Text style={styles.description}>
          Check queue information and estimated waiting times.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Best Time to Visit</Text>
        <Text style={styles.description}>
          Plan your visit around quieter periods.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FFF5F8',
  },
  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#D63384',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 17,
    color: '#777',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3D3E0',
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  link: {
    color: '#D63384',
    fontWeight: 'bold',
    marginTop: 12,
  },
});
