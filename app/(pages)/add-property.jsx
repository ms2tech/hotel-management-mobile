import React, { useState } from 'react';
import { View, Pressable, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import FormField from '../../components/FormField';
import FileField from '../../components/FileField';
import { Link } from 'expo-router';

const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default function AddProperty() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    thumbnail: {},
  });

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
    try {
      // Add validation logic here
      // Simulate a successful submission
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submit Error:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.form.safeAreaView} >
          <ScrollView style={styles.form.scrollView}>
            <View style={styles.form.formContainer}>
              <View style={{
                // alignItems: 'center',
                // justifyContent: 'center',
                // margin: 7
              }}>
                <Text style={styles.form.title}>Add Property</Text>
                <Text style={styles.form.subtitle}>Enter the details to create a property</Text>
              </View>
            
              <FormField
                title={"Property Name"}
                value={form.name}
                placeholder={'Lorem ipsum'}
                editable={!submitting}
                handleChangeText={(e) => setForm({
                  ...form, name: e
                })}
              />


              <FormField
                title={"Property Description"}
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


