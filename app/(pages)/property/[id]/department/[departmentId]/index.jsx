import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import { env } from '../../../../../../constants';

const API_BASE_URL = env.API_BASE_URL;

export default function DepartmentDetails() {
    const { departmentId } = useLocalSearchParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [submitting, setSubmitting] = useState()
    const [selectedImage, setSelectedImage] = useState(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
    });

    // Fetch department details
    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/department/${departmentId}`);
                const data = await response.json();
                setDepartment(data);
            } catch (error) {
                console.error('Error fetching department:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [departmentId]);

    const handleAddIssue = () => {
        setModalVisible(true);
    };



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

    const handleSaveIssue = async () => {
        console.log("HERRRRRE")
        setSubmitting(true);
        if (!form.title) {
            Alert.alert('Issue title required');
            setSubmitting(false);
            return;
        }
    
        try {
            // Add validation logic here
            console.log('API_BASE_URL', API_BASE_URL);
    
            // POST request
            const response = await axios.post(`${API_BASE_URL}/department/${departmentId}/add-issue`, {
                ...form,
                departmentId,
            });
    
            console.log('Response:', response.data);
            Alert.alert('Issue successfully added!');
            setDepartment(response.data.department);
            setModalVisible(false);
            setForm({
                title: '',
                description: '',
            });
        } catch (error) {
            console.error('Submit Error:', error);
            Alert.alert('Error', error.message);
        } finally {
            setSubmitting(false);
        }
    };
    

    

    const handleMarkAsComplete = async (issueId) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/department/${departmentId}/issues/${issueId}`, {
                status: 'closed',
            });
    
            // Update department state
            setDepartment((prev) => ({
                ...prev,
                issues: prev.issues.map((issue) =>
                    issue._id === issueId ? { ...issue, status: 'closed' } : issue
                ),
            }));
        } catch (error) {
            console.error('Error marking issue as complete:', error);
            Alert.alert('Error', 'Unable to mark issue as complete.');
        }
    };

    const handleDeleteIssue = async (issueId) => {
        try {
            await axios.delete(`${API_BASE_URL}/department/${departmentId}/issues/${issueId}`);
    
            // Update department state
            setDepartment((prev) => ({
                ...prev,
                issues: prev.issues.filter((issue) => issue._id !== issueId),
            }));
        } catch (error) {
            console.error('Error deleting issue:', error);
            Alert.alert('Error', 'Unable to delete issue.');
        }
    };
    
    

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Loading Department Details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Add Issue Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddIssue}>
                <Text style={styles.addButtonText}>Add Issue</Text>
            </TouchableOpacity>

            {/* Department Details */}
            <Text style={styles.title}>Current Issues ({department?.issues?.length})</Text>

            <ScrollView style={styles.scrollView}>
                {department?.issues && department.issues.length > 0 ? (
                    department.issues.map((issue, index) => (
                        <View key={issue._id || index} style={styles.issueContainer}>
                            {/* Delete Button */}
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteIssue(issue._id)}
                            >
                                <Text style={styles.deleteButtonText}>✕</Text>
                            </TouchableOpacity>

                            {/* Issue Details */}
                            <Text style={styles.issueTitle}>{issue.title}</Text>
                            <Text style={styles.issueDescription}>{issue.description}</Text>
                            <View style={styles.statusContainer}>
                                <Text style={styles.status}>{issue?.status?.toUpperCase()}</Text>
                            </View>

                            {/* Mark as Complete Button */}
                            {issue.status !== 'closed' && (
                                <TouchableOpacity
                                    style={styles.completeButton}
                                    onPress={() => handleMarkAsComplete(issue._id)}
                                >
                                    <Text style={styles.completeButtonText}>Mark as Complete</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.label}>There are no current issues</Text>
                )}
            </ScrollView>



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
                            value={form.title}
                            onChangeText={(text) => setForm({ ...form, title: text })}
                        />
                        <TextInput
                            style={styles.inputTextArea}
                            placeholder="Describe the issue"
                            value={form.description}
                            onChangeText={(text) => setForm({ ...form, description: text })}
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
    scrollView: {
        flex: 1,
        marginTop: 8,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    issueContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    issueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    issueDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 12,
        lineHeight: 20,
    },
    statusContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#4CAF50', // Green background for status
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    completeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FF5252',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
        marginBottom: 8,
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
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
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
