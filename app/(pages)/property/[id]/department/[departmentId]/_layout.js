import { Slot, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { env } from '../../../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function DepartmentLayout() {
    const { departmentId } = useLocalSearchParams(); // Get department ID
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (departmentId) {
            setLoading(true);
            axios
                .get(`${API_BASE_URL}/department/${departmentId}`)
                .then((response) => {
                    setDepartment(response.data);
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || 'Failed to fetch department';
                    setError(errorMessage);
                })
                .finally(() => setLoading(false));
        }
    }, [departmentId]);

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
            <Text style={styles.header}>Department: {department?.name}</Text>
            <Slot department={department} />
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
