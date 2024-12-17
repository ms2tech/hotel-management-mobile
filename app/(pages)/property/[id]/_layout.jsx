import { Slot, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyLayout() {
    const { id } = useLocalSearchParams(); // Get dynamic ID
    const navigation = useNavigation(); // Access navigation object
    const [property, setProperty] = useState(null); // Property data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch property details
    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/property/${id}`);
                setProperty(response.data); // Set fetched property data
            } catch (err) {
                console.error('Error fetching property:', err.message);
                setError('Failed to fetch property details');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();
    }, [id]);

    // Update the header title dynamically when `property` is updated
    useEffect(() => {
        if (property?.name) {
            navigation.setOptions({ title: property.name });
        } else if (loading) {
            navigation.setOptions({ title: 'Loading...' }); // Placeholder during fetch
        } else {
            navigation.setOptions({ title: 'Property' }); // Fallback
        }
    }, [navigation, property?.name, loading]);

    // Loading state
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return <Slot />; // Render child routes dynamically
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});
