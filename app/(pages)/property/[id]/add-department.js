import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams, useRouter, useNavigation } from 'expo-router'
import axios from 'axios'
import FormField from '../../../../components/FormField';
import FileField from '../../../../components/FileField';
import { Link } from 'expo-router';
import { env } from '../../../../constants'

const API_BASE_URL = env.API_BASE_URL
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default function AddProperty(props) {
  console.log('Props', props)
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { id } = useLocalSearchParams(); // Get the property ID from the route
  const [propertyName, setPropertyName] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    description: '',
    thumbnail: {},
  });

  const [user, setUser] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const fileSizeInMB = image.size / (1024 * 1024);

      if (fileSizeInMB > 5) {
        alert('Image is too big. It should not exceed 5MB');
        return;
      }

      setForm({ ...form, thumbnail: image });
      setSelectedImage(image.uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const submit = async () => {
    setSubmitting(true);
    if (!form.name){
      Alert.alert('Department Name is required')
      return
    }

    try {
      // Add validation logic here
      // Simulate a successful submission
      console.log('API_BASE_URL', API_BASE_URL)
    
      // POST request
      const response = await axios.post(`${API_BASE_URL}/property/add-department`, 
        { 
          ...form, 
          propertyId: id
        });
    
      console.log('Response:', response);
      Alert.alert('Department successfully added !');
      // router.push(`/property/${response.data.property._id}`)

    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          setUser(JSON.parse(userString));
          console.log('User String', userString)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
    // Simulate an API call to fetch the property name
    async function fetchPropertyName() {
        try {
            // Replace this with your actual API call
            const response = await fetch(`https://your-api.com/p/${id}`);
            const data = await response.json();
            setPropertyName(data.name);
        } catch (error) {roperties
            console.error('Failed to fetch property name:', error);
        }
    }

    fetchPropertyName();
}, [id]);

useEffect(() => {
    // Update the header title when the property name is available
    if (propertyName) {
        navigation.setOptions({
            headerTitle: propertyName,
        });
    }
}, [propertyName, navigation]);

  return (
    <SafeAreaView style={styles.form.safeAreaView} >
          <ScrollView style={styles.form.scrollView}>
            <View style={styles.form.formContainer}>
              <View style={{
                // alignItems: 'center',
                // justifyContent: 'center',
                // margin: 7
              }}>
                <Text style={styles.form.title}>Add Department</Text>
                <Text style={styles.form.subtitle}>Enter the details of the department</Text>
              </View>
            
              <FormField
                title={"Department Name"}
                value={form.name}
                placeholder={'Lorem ipsum'}
                editable={!submitting}
                handleChangeText={(e) => setForm({
                  ...form, name: e
                })}
              />


              <FormField
                title={"Department Description"}
                value={form.description}
                editable={!submitting}
                placeholder={'Type here...'}
                multiline={true}
                numberOfLines = {8}
                handleChangeText={(e) => setForm({
                  ...form, description: e
                })}
              />

              <FileField
                title={"Add banner"}
                titleText={'Add banner'}
                editable={!submitting}
                selectedImage={selectedImage}
                onPress={pickImageAsync}
              />

              <TouchableOpacity style={styles.form.actionButton} onPress={submit} disabled={submitting}>
                { submitting ? <ActivityIndicator /> : <Text style={styles.form.textBtn}>Save</Text>}
                
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    form: {
        safeAreaView: {
          backgroundColor: '#F8F8F8',
        },
      
        scrollView: {
          marginLeft: 'auto',
          marginRight: 'auto', 
          minHeight: '100%'
        },
        title: {
          fontSize: 0.0465*W,
          color: '#6151DC',
          fontWeight: '700',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontSize: 36
        },
        subtitle: {
          color: '#7E7E7E',
          fontSize: 13, 
          textAlign: 'center'
        },
        formContainer: {
          width: 0.8837*W,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          minHeight: 0.7221*H, 
          padding: 7,
          marginTop: 0.0222*H
          // paddingTop: 'auto',
        },
      
        actionButton: {
          backgroundColor: '#6151DC',
          color: 'white',
          width: '88%',
          alignItems: 'center',
          padding: 10,
          marginTop: '8%',
          borderRadius: 25,
          marginBottom: 0.01502*H,
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
      },
      overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000040',
      },
      modalView: {
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },

});



