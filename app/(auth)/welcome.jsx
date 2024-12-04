
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
// import { createUser } from '../../lib/appwrite'
// import { useGlobalContext } from "../../context/GlobalProvider"

const Welcome = () => {
//   const { setUser, setIsLogged } = useGlobalContext();

  const [submitting, setSubmitting] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

  const submit = async () => {
//     if (form.name === "" || form.email === "" || form.password === "") {
//       Alert.alert("Error", "Please fill in all fields");
//     }

//     setSubmitting(true);
//     try {
//       const result = await createUser(form.email, form.password, form.name);
//       setUser(result);
//       setIsLogged(true);

//       router.replace("/home");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setSubmitting(false);
//     }
  }

  const goToLogin = () => {
    router.push('/login')
  }

  const goToRegister = () => {
    router.push('/register')
  }


  return (
<SafeAreaView style={styles.safeAreaView} >
      <ScrollView style={{ marginTop: 0 }}>
        <View style={styles.containerView}>

          <Text style={styles.logoText}>MANAGEMENT</Text>

          <View style={styles.formContainer}>
            <Text style={styles.formHeaderText}>User Login </Text>
            <Text style={styles.formSubHeaderText}>Login as a user</Text>
            <TouchableOpacity style={styles.authButton} onPress={goToLogin} disabled={submitting}>
              {/* <Text style={styles.textBtn}>SignUp</Text> */}
              { submitting ? <ActivityIndicator /> : <Text style={styles.textBtn}>Login</Text>}
            </TouchableOpacity>
          </View>
          {/* <Text style={{ fontFamily: 'PlusJakartaSans-Medium', fontWeight: '500', fontSize: 15, lineHeight: 18.9, color: '#182942', marginTop: '10%'}}>Already have an account ?<Link href={'/login'} style={{ lineHeight: 18.9, fontSize: 15, color: '#6151DC' }}>{" "}Login</Link></Text> */}
        
          <View style={styles.formContainer}>
            <Text style={styles.formHeaderText}>New Account </Text>
            <Text style={styles.formSubHeaderText}>Make account as a manager</Text>
            <TouchableOpacity style={styles.authButton} onPress={goToRegister} disabled={submitting}>
              {/* <Text style={styles.textBtn}>SignUp</Text> */}
              { submitting ? <ActivityIndicator /> : <Text style={styles.textBtn}>Make Account</Text>}
            </TouchableOpacity>
          </View>
        
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

export default Welcome