import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Example dynamic property data
const myProperties = [
  { id: '1', name: 'Villa 101' },
  { id: '2', name: 'Lakeview Apartment' },
  { id: '3', name: 'City Center Loft' },
];

const logout = async () => {
  router.replace('/login'); // Redirect user to login screen
};

export default function Layout() {
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
            {myProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => router.push(`/property/${property.id}`)}
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
