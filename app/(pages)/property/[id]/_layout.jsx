import { Slot, useNavigation, useLocalSearchParams } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyLayout() {
  const { id } = useLocalSearchParams(); // Extract dynamic ID
  const navigation = useNavigation();
  const [propertyName, setPropertyName] = useState('Loading...'); // Default title
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property details
  useLayoutEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/property/${id}`);
        const fetchedPropertyName = response.data?.name || 'Unnamed Property';

        setPropertyName(fetchedPropertyName); // Update the title state

        // Dynamically update the header title
        navigation.setOptions({ title: fetchedPropertyName });
      } catch (err) {
        setError('Failed to load property');
        setPropertyName('Property'); // Default fallback
        navigation.setOptions({ title: 'Property' });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty(); // Fetch new property when `id` changes
    }
  }, [id, navigation]); // Runs synchronously when `id` or `navigation` changes

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
