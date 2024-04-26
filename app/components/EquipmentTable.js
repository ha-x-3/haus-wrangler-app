import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	Pressable,
	Modal,
	StyleSheet,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const EquipmentTable = () => {
	const [equipment, setEquipment] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteEquipmentId, setDeleteEquipmentId] = useState(null);

    useEffect(() => {
        loadEquipment();
	}, []);
		
	const loadEquipment = async () => {
		try {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				const result = await axios.get(
					'http://localhost:8080/api/equipment',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setEquipment(result.data);
			} else {
				console.error('No token available');
			}
		} catch (error) {
			console.error('Error loading equipment:', error);
		}
	};

	const handleDelete = async (equipmentId) => {
		try {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				await axios.delete(
					`http://localhost:8080/api/equipment/${equipmentId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				loadEquipment();
				setShowDeleteModal(false);
			} else {
				console.error('No token available');
			}
		} catch (error) {
			console.error('Error deleting equipment:', error);
		}
	};

	const openDeleteModal = (equipmentId) => {
		setDeleteEquipmentId(equipmentId);
		setShowDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const renderItem = ({ item }) => (
		<View style={styles.row}>
			<Text style={styles.cell}>{item.id}</Text>
			<Text style={styles.cell}>{item.name}</Text>
			<Text style={styles.cell}>{item.filterLifeDays}</Text>
			<Pressable
				style={styles.deleteButton}
				onPress={() => openDeleteModal(item.id)}
			>
				<Text style={styles.deleteButtonText}>Delete</Text>
			</Pressable>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerCell}>Equipment ID</Text>
				<Text style={styles.headerCell}>Equipment Name</Text>
				<Text style={styles.headerCell}>Max Days Filter Life</Text>
				<Text style={styles.headerCell}>Action</Text>
			</View>
			<FlatList
				data={equipment}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
			<Modal
				visible={showDeleteModal}
				animationType='slide'
				transparent
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Confirm Delete</Text>
						<Text style={styles.modalMessage}>
							Are you sure you want to delete this equipment?
						</Text>
						<View style={styles.modalButtons}>
							<Pressable
								style={styles.modalButton}
								onPress={closeDeleteModal}
							>
								<Text style={styles.modalButtonText}>
									Cancel
								</Text>
							</Pressable>
							<Pressable
								style={styles.modalButton}
								onPress={() => handleDelete(deleteEquipmentId)}
							>
								<Text style={styles.modalButtonText}>
									Delete
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		backgroundColor: 'rgb(198, 182, 129)',
		paddingVertical: 10,
	},
	headerCell: {
		flex: 1,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	row: {
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		backgroundColor: 'rgba(198, 182, 129, 0.8)',
        padding: 10,
	},
	cell: {
		flex: 1,
		textAlign: 'center',
	},
	deleteButton: {
		backgroundColor: '#35414D',
		padding: 10,
		borderRadius: 5,
	},
	deleteButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	modalButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
	},
	modalButtonText: {
		fontWeight: 'bold',
	},
});

export default EquipmentTable;
