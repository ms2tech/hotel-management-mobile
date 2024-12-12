import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;
const H = Dimensions.get('window').height
const W = Dimensions.get('window').width

export default function PropertyScreen(props) {
    console.log('Props', props)
  const { id } = useLocalSearchParams(); // Extract the property ID from the route
  const navigation = useNavigation();
  const [property, setProperty] = useState(null); // Hold the fetched property data
  const [loading, setLoading] = useState(true); // Track the loading state
  const [error, setError] = useState(null); // Track errors

  console.log('ID:', id);

  // Dynamically set the header title
  useLayoutEffect(() => {
    if (property) {
      navigation.setOptions({ title: property.name });
    } else {
      navigation.setOptions({ title: 'Property' });
    }
  }, [navigation, property]);

  useEffect(() => {
    const fetchProperty = async (propertyId) => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${API_BASE_URL}/property/${propertyId}`);
        setProperty(response.data); // Set the property data
        console.log('Property Details:', response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch property');
        console.error('Error fetching property:', error.response?.data || error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Property Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{ ...styles.authButton, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { 
                router.push(`property/${id}/add-department`)
            }}>
              <MaterialIcons name="add-circle" size={24} color="white" />
              { 
                (property.type === 'HOTEL') && <Text style={{ color: 'white', fontSize: 17, marginHorizontal: 3 }}>Add Department</Text>
              }

              {
                (property.type === 'APARTMENT') &&  <Text style={{ color: 'white', fontSize: 17, marginHorizontal: 3 }}>Add Units</Text>
              }
        </TouchableOpacity>
      </View>
         
      <View style={{ marginTop: 0.0222*H }}>
        {/* <Text style={styles.title}>{property.name}</Text> */}
        {/* <Text style={styles.description}>{property.description}</Text> */}
        <Text style={styles.issueText}>     
          There are no departments here
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 0.01*W
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
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  buttonContainer: {
    // position: 'absolute',
    // // top: 10,
    // left: 10,
    width: '100%',
    // marginLeft: '20%'
   
  },
  text: {
    fontSize: 18,
    color: "white",
    // marginTop: 50,
  },

  issueText: {
    fontSize: 18,
    marginTop: 0.0111*H,
  }, 

  authButton: {
    backgroundColor: '#6151DC',
    color: 'white',
    // width: '44%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: '7%',
    borderRadius: 25,
  },
});
