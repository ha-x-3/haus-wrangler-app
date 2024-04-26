import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AddEquipmentForm = () => {
	const [equipment, setEquipment] = useState({
		id: '',
		name: '',
		filterLifeDays: '',
	});

	const [errors, setErrors] = useState({});

	const handleChange = (name, value) => {
		setEquipment({ ...equipment, [name]: value });
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		// Validate name
		if (
			!equipment.name.trim() ||
			equipment.name.trim().length < 2 ||
			equipment.name.trim().length > 50
		) {
			newErrors.name =
				'Name is required and must be between 2 and 50 characters.';
			isValid = false;
		}

		// Validate filterLifeDays
		if (
			!equipment.filterLifeDays ||
			parseFloat(equipment.filterLifeDays) <= 0
		) {
			newErrors.filterLifeDays =
				'Filter Life in Days is required and must be a positive number.';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const saveEquipment = async () => {
        if (validateForm()) {
            try {
                const token = await SecureStore.getItemAsync('token');
                await axios.post(
                    'http://localhost:8080/api/equipment',
                    equipment,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            withCredentials: true,
                        },
                    }
                );
            } catch (error) {
                console.error('Error:', error);
            } finally {
                router.back();
            }
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Equipment Name:</Text>
			<TextInput
				style={[styles.input, errors.name && styles.inputError]}
				value={equipment.name}
                placeholder='Enter a name for your equipment'
				onChangeText={(value) => handleChange('name', value)}
			/>
			{errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

			<Text style={styles.label}>Filter Life in Days:</Text>
			<TextInput
				style={[
					styles.input,
					errors.filterLifeDays && styles.inputError,
				]}
				value={equipment.filterLifeDays}
                placeholder='Number of days between filter change'
				onChangeText={(value) => handleChange('filterLifeDays', value)}
				keyboardType='numeric'
			/>
			{errors.filterLifeDays && (
				<Text style={styles.errorText}>{errors.filterLifeDays}</Text>
			)}

			<Pressable
				style={styles.button}
				onPress={saveEquipment}
			>
				<Text style={styles.buttonText}>Submit</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
		backgroundColor: 'white',
        width: '100%',
	},
	inputError: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#869C71',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		marginTop: 10,
        width: '50%',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default AddEquipmentForm;
