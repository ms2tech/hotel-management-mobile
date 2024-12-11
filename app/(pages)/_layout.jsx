import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { router } from 'expo-router';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { env } from '../../constants'
const API_BASE_URL = env.API_BASE_URL 

// Example dynamic property data
const myProperties = [
  { id: '1', name: 'Villa 101' },
  { id: '2', name: 'Lakeview Apartment' },
  { id: '3', name: 'City Center Loft' },
];

const logout = async () => {
    await SecureStore.deleteItemAsync('jwtToken')
    await AsyncStorage.removeItem('user')
    router.replace('/login'); // Redirect user to login screen
};

export default function Layout() {
  const [user, setUser] = useState()
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUserProperties = async () => {
      try {
        setLoading(true)
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const usr = JSON.parse(userString)
          console.log('USER', usr)
          setUser(usr)
          const token = await AsyncStorage.getItem('authToken') // Retrieve token from storage
          const response = await axios.get(`${API_BASE_URL}/properties/fetch-user-properties?ownerId=${usr._id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token for authentication
            },
            // params: {
            //   ownerId: usr._id, // Add your query parameters here
            //   // r
            // },
          })
          console.log('RESPONSE', response)
          setProperties(response.data); // Update state with fetched properties
        } 
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false)
      }
    };
    fetchCurrentUserProperties()
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
            {/* Default Drawer Items */}
            <DrawerItemList {...props} />

            {/* Section Title */}
            <Text style={styles.sectionTitle}>My Properties</Text>

            {/* Dynamic Property Links */}
            {properties.map((property) => (
              <TouchableOpacity
                key={property._id}
                onPress={() => router.push(`/property/${property._id}`)}
                style={styles.propertyLink}
              >
                <MaterialIcons name="apartment" size={20} color="#333" />
                <Text style={styles.propertyText}>{property.name}</Text>
              </TouchableOpacity>
            ))}

            {/* Logout Button */}
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <AntDesign name="logout" size={20} color="#d9534f" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </DrawerContentScrollView>
        )}
      >
        {/* Static Screens */}
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ size, color }) => <AntDesign name="home" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="add-property"
          options={{
            drawerLabel: 'Add Property',
            title: 'Add Property',
            drawerIcon: ({ size, color }) => <MaterialIcons name="add-circle" size={size} color={color} />,
          }}
        />

        {/* Dynamic Property Screens */}
        {myProperties.map((property) => (
          <Drawer.Screen
            key={property.id}
            name={`property/${property.id}`}
            options={{
              drawerLabel: property.name,
              title: property.name,
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="apartment" size={size} color={color} />
              ),
            }}
          />
        ))}

        {/* Hidden Dynamic Route */}
        <Drawer.Screen
          name="property/[id]" // Match the dynamic route
          options={{
            drawerItemStyle: { display: 'none' }, // Hide from the drawer
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  propertyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  propertyText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#d9534f',
    fontWeight: 'bold',
  },
});
