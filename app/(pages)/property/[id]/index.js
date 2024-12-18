import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default function PropertyScreen() {
  const { id } = useLocalSearchParams(); // Extract property ID
  const navigation = useNavigation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    if (property) {
      navigation.setOptions({ title: property.name });
    } else {
      navigation.setOptions({ title: 'Property' });
    }
  }, [navigation, property]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/property/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
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

  if (!property) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Property Not Found</Text>
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

      {/* <Text style={styles.title}>{property.name}</Text> */}

      {/* Render FlatList for departments or units */}
      {property.type === 'HOTEL' ? (
        <>
          <Text style={styles.subtitle}>Departments</Text>
          {property.departments?.length ? (
            <FlatList
              data={property.departments}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
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
              renderItem={renderItem}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
