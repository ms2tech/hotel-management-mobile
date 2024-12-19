import { Slot, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { env } from '../../../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function UnitLayout() {
    const { unitId } = useLocalSearchParams(); // Get department ID
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (unitId) {
            setLoading(true);
            axios
                .get(`${API_BASE_URL}/unit/${unitId}`)
                .then((response) => {
                    setUnit(response.data);
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || 'Failed to fetch unit';
                    setError(errorMessage);
                })
                .finally(() => setLoading(false));
        }
    }, [unitId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Unit: {unit?.name}</Text>
            <Slot unit={unit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
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
    },
});
