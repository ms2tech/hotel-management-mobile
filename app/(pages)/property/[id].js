import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function PropertyScreen() {
  const { id } = useLocalSearchParams(); // Extract the property ID from the route
  const navigation = useNavigation();

  // Example property data
  const propertyData = {
    '1': { name: 'Villa 101', description: 'A beautiful villa with a pool.' },
    '2': { name: 'Lakeview Apartment', description: 'An apartment with a stunning lake view.' },
    '3': { name: 'City Center Loft', description: 'A modern loft in the heart of the city.' },
  };

  const property = propertyData[id];

  // Dynamically set the header title
  useLayoutEffect(() => {
    if (property) {
      navigation.setOptions({ title: property.name });
    } else {
      navigation.setOptions({ title: 'Property' });
    }
  }, [navigation, property]);

  if (!property) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Property Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{property.name}</Text>
      <Text style={styles.description}>{property.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
