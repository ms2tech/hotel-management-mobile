import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Link, router, Redirect } from 'expo-router'
import { login } from '../../backend-functions/account'
// import { getCurrentUser, signIn } from "../../lib/appwrite"
// import { useGlobalContext } from "../../context/GlobalProvider"

const Login = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) {
  //   return <Redirect href="/home" />
  // } 
  // else {
  //   return <Redirect href="/login" />
  // }
  //  const { setUser, setIsLogged } = useGlobalContext();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const token = await login(form.email, form.password);
      // const result = await getCurrentUser();
      // await setUser(result);
      // await setIsLogged(true);

      Alert.alert("Success", `Token:${token} User signed in successfully`);
      // router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeAreaView} >
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerView}>

          <Text style={styles.logoText}>MANAGEMENT</Text>

          <View style={styles.formContainer}>
            <Text style={styles.formHeaderText}>User Login</Text>
            <Text style={styles.formSubHeaderText}>Log into your account</Text>

            <FormField 
              title={"Email or Phone"}
              value={form.email}
              editable={!submitting}
              handleChangeText={(e) => setForm({
                ...form, email: e
              })}
              keyboardType={"email-address"}
            />

            <FormField 
              title={"Password"}
              value={form.password}
              editable={!submitting}
              handleChangeText={(e) => setForm({
                ...form, password: e
              })}
            />

            {/* <View style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left', width: '88.37%', paddingTop: '9%' }}>
              <Link href={'/forgot-password'} style={{ color: '#6151DC', fontSize: 12, fontWeight: '500', fontStyle: 'italic', fontFamily: 'PlusJakartaSans-Italic' }}>Forgot Password ?</Link>
            </View> */}

            <TouchableOpacity style={styles.authButton} onPress={submit} disabled={submitting}>
              { submitting ? <ActivityIndicator /> : <Text style={styles.textBtn}>Login</Text>}
              
            </TouchableOpacity>
          </View>

          <Text style={{ fontFamily: 'PlusJakartaSans-Medium', fontWeight: '500', fontSize: 15, lineHeight: 18.9, color: '#182942', marginTop: '20%'}}>Don't have an account ?<Link href={'/register'} style={{ fontFamily: 'PlusJakartaSans-Medium', fontWeight: '500', fontSize: 15, lineHeight: 18.9, color: '#6151DC', textDecorationLine: 'underline'  }}>{" "}Create Account</Link></Text>
         
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

export default Login