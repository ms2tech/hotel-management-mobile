import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    <GestureHandlerRootView style={{ flex:1 }}>
      <Drawer>
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
            name={`property/${property.id}`} // Dynamic route
            options={{
              drawerLabel: property.name, // Use property name in the drawer
              title: property.name, // Set the property name as the header title
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
});
