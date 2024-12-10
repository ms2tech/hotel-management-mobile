import React, { useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
// import { createUser } from '../../lib/appwrite'
// import { useGlobalContext } from "../../context/GlobalProvider"

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

const Welcome = () => {

  return (
    <SafeAreaView style={styles.safeAreaView} >
      <ScrollView style={{ }}>
        <View style={styles.containerView}>
          <Text style={styles.logoText}>Welcome !</Text>
  
          <TouchableOpacity style={{ ...styles.authButton, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { router.navigate('/add-property')}}>
              <MaterialIcons name="add-circle" size={24} color="white" />
              <Text style={{ color: 'white', fontSize: 17, marginHorizontal: 4 }}>Add Property</Text>
          </TouchableOpacity>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#F8F8F8',
    height: '100%'
  },

  scrollView: {
    height: '100%'
  },

  containerView: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    minHeight: Dimensions.get("window").height,

  },

  logoText: {
    marginTop: 0.0222*H,
    fontSize: 33,
    fontWeight: '700',
    textAlign: 'center',
    color: '#6151DC',
    backgroundColor: '#F8F8F8',
    fontFamily: 'PlusJakartaSans-SemiBold'
  },

  formContainer: {
    width: '88.37%',
    marginTop: '12%',
    paddingTop: '6%',
    paddingBottom: '5%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },

  authButton: {
    backgroundColor: '#6151DC',
    color: 'white',
    width: '44%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: '8%',
    borderRadius: 25,
  },
  textBtn: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18.9,
  },

  formHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6151DC',
    lineHeight: 25.2,
    fontFamily: 'PlusJakartaSans-SemiBold'
  },

  formSubHeaderText: {
    textAlign: 'center',
    width: '88%',
    marginTop: 4,
    color: '#7E7E7E',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16.38,    
    fontFamily: "PlusJakartaSans-Medium"
  }
});

export default Welcome