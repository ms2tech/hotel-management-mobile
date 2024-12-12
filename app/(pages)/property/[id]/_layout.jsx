import { Slot, useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyLayout() {
    const { id } = useLocalSearchParams(); // Get the property ID from route parameters
    const navigation = useNavigation();
    const [propertyState, setPropertyState] = useState({
        data: null,
        loading: true,
        error: null,
    });

    // Dynamically update the header title
    useLayoutEffect(() => {
        const title = propertyState.loading
            ? 'Loading...' // Show a generic title while loading
            : propertyState.data?.name || 'Property';
        navigation.setOptions({ title });
    }, [navigation, propertyState.data, propertyState.loading, id]);

    // Fetch property data
    useEffect(() => {
        if (id) {
            setPropertyState({ data: null, loading: true, error: null }); // Reset state when ID changes
            axios
                .get(`${API_BASE_URL}/property/${id}`)
                .then((response) =>
                    setPropertyState({ data: response.data, loading: false, error: null })
                )
                .catch((error) => {
                    const errorMessage = error.response?.data?.message || 'Failed to fetch property';
                    setPropertyState({ data: null, loading: false, error: errorMessage });
                });
        }
    }, [id]);

    // Show a loading indicator while fetching data
    if (propertyState.loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Show an error message if fetching data fails
    if (propertyState.error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{propertyState.error}</Text>
            </View>
        );
    }

    // Render the child route when data is available
    return <Slot property={propertyState.data} />;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
