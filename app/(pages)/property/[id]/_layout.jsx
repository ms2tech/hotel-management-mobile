// import { Slot, useNavigation, useLocalSearchParams } from 'expo-router';
// import { useEffect, useLayoutEffect, useState } from 'react';
// import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
// import axios from 'axios';
// import { env } from '../../../../constants';

// const API_BASE_URL = env.API_BASE_URL;

// export default function PropertyLayout() {
//     const { id } = useLocalSearchParams(); // Get the dynamic property ID
//     const navigation = useNavigation();

//     const [propertyState, setPropertyState] = useState({
//         data: null,
//         loading: true,
//         error: null,
//     });

//     // Fetch property details when `id` changes
//     useEffect(() => {
//         const fetchProperty = async () => {
//             setPropertyState({ data: null, loading: true, error: null }); // Reset state
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/property/${id}`);
//                 setPropertyState({ data: response.data, loading: false, error: null });
//             } catch (error) {
//                 setPropertyState({
//                     data: null,
//                     loading: false,
//                     error: error.response?.data?.message || 'Failed to fetch property',
//                 });
//             }
//         };

//         if (id) fetchProperty();
//     }, [id]);

//     // Force update header after state changes
//     useEffect(() => {
//         if (propertyState.data) {
//             navigation.setOptions({ title: propertyState.data.name });
//         } else {
//             navigation.setOptions({ title: 'Property' });
//         }
//     }, [navigation, propertyState.data]);

//     // Loading state
//     if (propertyState.loading) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     // Error state
//     if (propertyState.error) {
//         return (
//             <View style={styles.center}>
//                 <Text style={styles.error}>{propertyState.error}</Text>
//             </View>
//         );
//     }

//     // Render the child route with Slot
//     return <Slot />;
// }

// const styles = StyleSheet.create({
//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     error: {
//         fontSize: 16,
//         color: 'red',
//         textAlign: 'center',
//     },
// });


import { Slot, useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { env } from '../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function PropertyLayout() {
    const { id } = useLocalSearchParams(); // Get dynamic ID
    const navigation = useNavigation();
    const [propertyName, setPropertyName] = useState(null); // Hold title
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/property/${id}`);
                setPropertyName(response.data?.name || 'Property'); // Set title
            } catch (err) {
                setError('Failed to load property');
                setPropertyName('Property'); // Default fallback
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    // Update the header title when propertyName changes
    useEffect(() => {
        navigation.setOptions({ title: propertyName });
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
