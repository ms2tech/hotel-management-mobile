import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { env } from '../../constants';

const API_BASE_URL = env.API_BASE_URL;

const logout = async () => {
  await SecureStore.deleteItemAsync('jwtToken');
  await AsyncStorage.removeItem('user');
  router.replace('/login');
};

function Layout() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const usr = JSON.parse(userString);
          const token = await AsyncStorage.getItem('authToken');
          const response = await axios.get(
            `${API_BASE_URL}/properties/fetch-user-properties?ownerId=${usr._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setProperties(response.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ drawerItemStyle: { marginVertical: 5 } }}
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
                <Text style={styles.propertyText}>{property.name || 'Unnamed Property'}</Text>
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

        {/* Hidden Screens */}
        <Drawer.Screen
          name="property/[id]/add-department"
          options={{
            drawerLabel: () => null, // Hide from drawer
            drawerItemStyle: { display: 'none' },
            title: 'Add Department',
          }}
        />
        <Drawer.Screen
          name="property/[id]/department/[departmentId]"
          options={{
            drawerLabel: () => null, // Hide from drawer
            drawerItemStyle: { display: 'none' },
            title: 'Department',
          }}
        />

        {/* Dynamic Property Screens */}
        {properties.map((property) => (
          <Drawer.Screen
            key={property._id}
            name={`property/${property._id}`}
            options={{
              drawerLabel: property.name || 'Unnamed Property',
              title: property.name || 'Unnamed Property',
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="apartment" size={size} color={color} />
              ),
            }}
          />
        ))}
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



export default Layout