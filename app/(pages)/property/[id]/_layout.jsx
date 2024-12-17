import { Slot, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyLayout() {
    const { id } = useLocalSearchParams(); // Extract the dynamic route param
    const navigation = useNavigation();
    const [propertyName, setPropertyName] = useState('Loading...'); // Default placeholder
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/property/${id}`);
                const name = response.data?.name || 'Property';
                setPropertyName(name);
            } catch (err) {
                setPropertyName('Property'); // Fallback title
                setError('Failed to load property');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    // Update navigation options dynamically
    useEffect(() => {
        navigation.setOptions({
            title: propertyName, // Dynamically set the header title
        });
    }, [navigation, propertyName]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return <Slot />;
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
