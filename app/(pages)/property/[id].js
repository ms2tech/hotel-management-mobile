import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PropertyScreen() {
  const { id } = useLocalSearchParams(); // Get property ID from the route

  // Example property data
  const propertyData = {
    '1': { name: 'Villa 101', description: 'A beautiful villa with a pool.' },
    '2': { name: 'Lakeview Apartment', description: 'An apartment with a stunning lake view.' },
    '3': { name: 'City Center Loft', description: 'A modern loft in the heart of the city.' },
  };

  const property = propertyData[id];

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

export const options = ({ route }) => {
  const { id } = route.params || {}; // Get the property ID from route params
  const propertyData = {
    '1': { name: 'Villa 101' },
    '2': { name: 'Lakeview Apartment' },
    '3': { name: 'City Center Loft' },
  };

  const property = propertyData[id];

  return {
    title: property ? property.name : 'Property',
  };
};

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
