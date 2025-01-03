import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyScreen() {
  const { id } = useLocalSearchParams(); // Extract property ID
  const navigation = useNavigation(); // Import and use navigation
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/property/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError('Failed to fetch property');
      } finally {
        setLoading(false);
      }
    };

    setProperty(null); // Reset property state
    fetchProperty();
  }, [id]);

  // Immediate header updates when property changes
  useLayoutEffect(() => {
    if (property?.name) {
      navigation.setOptions({ title: property.name });
    } else {
      navigation.setOptions({ title: 'Property' });
    }
  }, [property, navigation]);

  const renderDepartment = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => { router.push(`property/${id}/department/${item._id}`)}} >
      <MaterialIcons name="apartment" size={24} color="#6151DC" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>
          {item.description || 'No description available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderUnit = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => { router.push(`property/${id}/unit/${item._id}`)}}>
      <MaterialIcons name="apartment" size={24} color="#6151DC" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>
          {item.description || 'No description available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            router.push(
              property.type === 'APARTMENT'
                ? `property/${id}/add-unit`
                : `property/${id}/add-department`
            );
          }}
        >
          <MaterialIcons name="add-circle" size={24} color="white" />
          <Text style={styles.addButtonText}>
            {property.type === 'HOTEL' ? 'Add Department' : 'Add Unit'}
          </Text>
        </TouchableOpacity>
      </View>

      {property.type === 'HOTEL' ? (
        <>
          <Text style={styles.subtitle}>Departments</Text>
          {property.departments?.length ? (
            <FlatList
              data={property.departments}
              keyExtractor={(item) => item._id}
              renderItem={renderDepartment}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.noDataText}>No departments added.</Text>
          )}
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Units</Text>
          {property.units?.length ? (
            <FlatList
              data={property.units}
              keyExtractor={(item) => item._id}
              renderItem={renderUnit}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.noDataText}>No units added.</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6151DC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  itemDetails: {
    marginLeft: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
