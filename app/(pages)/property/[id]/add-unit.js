import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import axios from 'axios';
import FormField from '../../../../components/FormField';
import FileField from '../../../../components/FileField';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export default function AddProperty() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useLocalSearchParams(); // Get the property ID from the route
  const navigation = useNavigation();
  const router = useRouter();

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
    if (!form.name) {
      Alert.alert('Unit Name is required');
      return;
    }

    try {
      // POST request
      const response = await axios.post(`${API_BASE_URL}/property/add-unit`, {
        ...form,
        propertyId: id,
      });

      console.log('Response:', response);
      Alert.alert('Unit successfully added!');
      router.push(`/property/${id}`);
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamically set the header title
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Add Unit' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.form.safeAreaView}>
      <ScrollView style={styles.form.scrollView}>
        <View style={styles.form.formContainer}>
          <Text style={styles.form.title}>Add Unit</Text>
          <Text style={styles.form.subtitle}>Enter the details of the unit</Text>

          <FormField
            title="Unit Name"
            value={form.name}
            placeholder="Lorem ipsum"
            editable={!submitting}
            handleChangeText={(e) => setForm({ ...form, name: e })}
          />

          <FormField
            title="Unit Description"
            value={form.description}
            editable={!submitting}
            placeholder="Type here..."
            multiline={true}
            numberOfLines={8}
            handleChangeText={(e) => setForm({ ...form, description: e })}
          />

          <FileField
            title="Add banner"
            titleText="Add banner"
            editable={!submitting}
            selectedImage={selectedImage}
            onPress={pickImageAsync}
          />

          <TouchableOpacity style={styles.form.actionButton} onPress={submit} disabled={submitting}>
            {submitting ? <ActivityIndicator /> : <Text style={styles.form.textBtn}>Save</Text>}
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
      minHeight: '100%',
    },
    title: {
      fontSize: 0.0465 * W,
      color: '#6151DC',
      fontWeight: '700',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 36,
    },
    subtitle: {
      color: '#7E7E7E',
      fontSize: 13,
      textAlign: 'center',
    },
    formContainer: {
      width: 0.8837 * W,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      minHeight: 0.7221 * H,
      padding: 7,
      marginTop: 0.0222 * H,
    },
    actionButton: {
      backgroundColor: '#6151DC',
      color: 'white',
      width: '88%',
      alignItems: 'center',
      padding: 10,
      marginTop: '8%',
      borderRadius: 25,
      marginBottom: 0.01502 * H,
    },
    textBtn: {
      color: 'white',
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 18.9,
    },
  },
});
