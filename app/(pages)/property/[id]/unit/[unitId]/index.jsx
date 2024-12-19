import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ActivityIndicator } from 'react-native';
import { env } from '../../../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function UnitDetails() {
    const { unitId } = useLocalSearchParams();
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [issueTitle, setIssueTitle] = useState('')
    const [issueDescription, setIssueDescription] = useState('');

    // Fetch unit details
    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/unit/${unitId}`);
                const data = await response.json();
                setUnit(data);
            } catch (error) {
                console.error('Error fetching unit:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUnit();
    }, [unitId]);

    const handleAddIssue = () => {
        setModalVisible(true);
    };

    const handleSaveIssue = () => {
        console.log('Issue Saved:', issueDescription);
        setModalVisible(false);
        setIssueDescription('');
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Loading Unit Details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Add Issue Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddIssue}>
                <Text style={styles.addButtonText}>Add Issue</Text>
            </TouchableOpacity>

            {/* Unit Details */}
            <Text style={styles.title}>Current Issues</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>There are no current issues</Text>
                {/* <Text style={styles.value}>{unitId}</Text>

                <Text style={styles.label}>Unit Name:</Text>
                <Text style={styles.value}>{unit?.name || 'N/A'}</Text> */}
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Issue</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Issue Title"
                            value={issueTitle}
                            onChangeText={setIssueTitle}
                            multiline
                        />
                        <TextInput
                            style={styles.inputTextArea}
                            placeholder="Describe the issue"
                            value={issueDescription}
                            onChangeText={setIssueDescription}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Save" onPress={handleSaveIssue} />
                            <Button
                                title="Cancel"
                                color="red"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        marginBottom: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputText: {
        // height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    inputTextArea: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
