import { Slot, useNavigation, useLocalSearchParams } from 'expo-router';
import { useLayoutEffect } from 'react';
import axios from 'axios';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyLayout() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const fetchPropertyTitle = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/property/${id}`);
        const propertyName = response.data?.name || 'Property';

        navigation.setOptions({ title: propertyName });
      } catch (error) {
        navigation.setOptions({ title: 'Property Not Found' });
      }
    };

    if (id) fetchPropertyTitle();
  }, [id, navigation]); // Runs whenever `id` changes

  return (
    // Key ensures this component remounts when `id` changes
    <Slot key={id} />
  );
}