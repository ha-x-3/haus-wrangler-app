import React, { useState } from 'react';
import {
	View,
    ImageBackground,
	Text,
	TextInput,
	StyleSheet,
	Pressable,
	Alert,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Register = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState('USER');

	const { login } = useAuth();
    const router = useRouter();
    const background = require('../../assets/loftRight.png');


	const handleNameChange = (text) => {
		setName(text);
	};

	const handlePasswordChange = (text) => {
		setPassword(text);
	};

	const handleConfirmPasswordChange = (text) => {
		setConfirmPassword(text);
	};

	const handleRoleChange = (value) => {
		setRole(value);
	};

	const handleEmailChange = (text) => {
		setEmail(text);
	};

	const isValidEmail = (email) => {
		const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailValidation.test(email);
	};

	const handleSubmit = async () => {
		let isValid = true;

		if (/[^a-zA-Z0-9 ]/.test(name) || name.length < 2 || name.length > 20) {
			Alert.alert(
				'Error',
				'Username must be between 2-20 letters and not contain special characters'
			);
			isValid = false;
		}

		if (!isValidEmail(email)) {
			Alert.alert('Error', 'Invalid email format');
			isValid = false;
		}

		if (password.length < 4 || password.length > 20) {
			Alert.alert(
				'Error',
				'Password must be between 4 and 20 characters'
			);
			isValid = false;
		}

		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			isValid = false;
		}

		if (isValid) {
			try {
				const response = await axios.post(
					'http://localhost:8080/api/register',
					{
						email,
						password,
						username: name,
						verifyPassword: confirmPassword,
						role,
					},
					{
						withCredentials: true,
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
				const token = response.data.accessToken;
				await login(email, password);
				Alert.alert('Success', 'Registration successful!');
			} catch (error) {
				if (error.response && error.response.status === 409) {
					Alert.alert('Error', 'Email already has an account.');
				} else {
					console.error('Error:', error);
					Alert.alert(
						'Error',
						'An error occurred during registration.'
					);
				}
			}
		}
	};

    const handleCancel = () => {
		// Navigate back to the index route
		router.push('/');
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={background}
				resizeMode='cover'
				style={styles.background}
			>
				<Text style={styles.title}>Register</Text>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Username</Text>
					<TextInput
						style={styles.input}
						placeholder='Username'
						value={name}
						onChangeText={handleNameChange}
						autoCapitalize='none'
					/>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder='Email'
						value={email}
						onChangeText={handleEmailChange}
						autoCapitalize='none'
						keyboardType='email-address'
					/>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Password</Text>
					<TextInput
						style={styles.input}
						placeholder='Password'
						value={password}
						onChangeText={handlePasswordChange}
						secureTextEntry
					/>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Verify Password</Text>
					<TextInput
						style={styles.input}
						placeholder='Confirm Password'
						value={confirmPassword}
						onChangeText={handleConfirmPasswordChange}
						secureTextEntry
					/>
				</View>
				<View style={styles.roleContainer}>
					<Text style={styles.label}>Role:</Text>
					<Pressable
						style={[
							styles.roleButton,
							role === 'ADMIN' && styles.roleButtonSelected,
						]}
						onPress={() => handleRoleChange('ADMIN')}
					>
						<Text style={styles.roleButtonText}>Admin</Text>
					</Pressable>
					<Pressable
						style={[
							styles.roleButton,
							role === 'USER' && styles.roleButtonSelected,
						]}
						onPress={() => handleRoleChange('USER')}
					>
						<Text style={styles.roleButtonText}>User</Text>
					</Pressable>
				</View>
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						onPress={handleSubmit}
					>
						<Text style={styles.buttonText}>Register</Text>
					</Pressable>
					<Pressable
						style={[styles.button, styles.cancelButton]}
						onPress={handleCancel}
					>
						<Text style={styles.buttonText}>Cancel</Text>
					</Pressable>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		width: 300,
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		paddingHorizontal: 10,
		marginBottom: 10,
		backgroundColor: 'white',
	},
	roleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	labelContainer: {
		alignItems: 'flex-start',
		marginBottom: 10,
	},
	label: {
		marginRight: 10,
		fontWeight: 'bold',
	},
	roleButton: {
		backgroundColor: '#ccc',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4,
		marginHorizontal: 5,
	},
	roleButtonSelected: {
		backgroundColor: '#35414D',
	},
	roleButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		backgroundColor: '#869C71',
		padding: 10,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	cancelButton: {
		backgroundColor: '#35414D',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
	},
});


export default Register;
