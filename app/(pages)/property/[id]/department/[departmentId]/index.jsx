import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DepartmentDetails({ department }) {
    const { departmentId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Department Details</Text>
            <Text>Department ID: {departmentId}</Text>
            <Text>Department Name: {department?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
