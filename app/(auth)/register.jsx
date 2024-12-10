
import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
// import axios from 'axios'
import { createAccount } from '../../backend-functions/account'
// import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider"

const Register = () => {
  // const { setIsLogged, setUser } = useGlobalContext();
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    // phone: "",
    password: "",
  });

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    console.log('Form', form)
    try {
      const { user, message, token } = await createAccount(form.name, form.email, form.password)  
      await saveToken('jwtToken', token);
      await setUser(user);
      await setIsLogged(true);
      Alert.alert('Success', message);
      router.replace("/home");
    } catch (error) {
        console.log('Error', error)
        Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <SafeAreaView style={styles.safeAreaView} >
      <ScrollView>
        <View style={styles.containerView}>

        <Text style={styles.logoText}>MANAGEMENT</Text>


          <View style={styles.formContainer}>
            <Text style={styles.formHeaderText}>New Account</Text>
            <Text style={styles.formSubHeaderText}>Create a new account</Text>


            <FormField 
              title={"Full Name"}
              value={form.name}
              editable={!submitting}
              handleChangeText={(e) => setForm({
                ...form, name: e
              })}
            />

            <FormField 
              title={"Email"}
              value={form.email}
              editable={!submitting}
              handleChangeText={(e) => setForm({
                ...form, email: e
              })}
              keyboardType={"email-address"}
            />

            {/* <FormField 
              title={"Phone Number"}
              value={form.phone}
              editable={!submitting}
              handleChangeText={(e) => setForm({
                ...form, phone: e
              })}
            /> */}

            <FormField 
              title={"Password"}
              value={form.password}
              editable={!submitting}
              handleChangeText={(e) => setForm({
                ...form, password: e
              })}
            />

            <FormField 
              title={"Password"}
              titleText={"Confirm Password"}
              editable={!submitting}
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({
                ...form, confirmPassword: e
              })}
            />


            

            <TouchableOpacity style={styles.authButton} onPress={submit} disabled={submitting}>
              {/* <Text style={styles.textBtn}>SignUp</Text> */}
              { submitting ? <ActivityIndicator /> : <Text style={styles.textBtn}>Make Account</Text>}
            </TouchableOpacity>
            

          </View>

          <Text style={{ fontFamily: 'PlusJakartaSans-Medium', fontWeight: '500', fontSize: 15, lineHeight: 18.9, color: '#182942', marginTop: '10%' }}>Already have an account ?<Link href={'/login'} style={{ lineHeight: 18.9, fontSize: 15, color: '#6151DC' }}>{" "}Login</Link></Text>
         
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    minHeight: Dimensions.get("window").height 
  },

  logoText: {
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
    width: '88%',
    alignItems: 'center',
    padding: 10,
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

export default Register