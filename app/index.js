import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View style={styles.container}>
      <Text>TO TEST PAGES</Text>
      <Link href={'/welcome'} style={styles.link}>Go To Welcome Page</Link>
      <Link href={'/register'} style={styles.link}>Register</Link>
      <Link href={'/login'} style={styles.link}>Login</Link>
      <Link href={'/home'} style={styles.link}>Authenticated Home</Link>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  link : { 
    color: 'blue',
    marginTop: 10,
    marginBottom: 10
  }
});


