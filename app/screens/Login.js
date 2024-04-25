import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	Pressable,
	View,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
	const background = require('../../assets/loftLeft.png');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();
	const router = useRouter();

	const handleLogin = async () => {
		try {
			await login(email, password);
			// Navigate to the EditScreen after successful login
			//router.push('/EditScreen');
			alert('Login Successful!');
		} catch (error) {
			console.error('Error has occurred', error);
			alert('An error has occurred while logging in.');
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
				<Text style={styles.title}>Login</Text>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder='Enter your email'
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
					keyboardType='email-address'
				/>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					placeholder='Enter your password'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						onPress={handleLogin}
					>
						<Text style={styles.buttonText}>Submit</Text>
					</Pressable>
					<Pressable
						style={[styles.button, styles.cancelButton]}
						onPress={handleCancel}
					>
						<Text style={styles.buttonText}>Cancel</Text>
					</Pressable>
				</View>
				<Text style={styles.registerText}>
					Don't have an account?{' '}
					<Text
						style={styles.registerLink}
						onPress={() => router.push('/RegisterScreen')}
					>
						Register here
					</Text>
				</Text>
				<StatusBar style='auto' />
			</ImageBackground>
		</View>
	);
}

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
		textAlign: 'center',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	input: {
		height: 40,
		width: 200,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '60%',
	},
	button: {
		backgroundColor: '#869C71',
		padding: 10,
		borderRadius: 5,
		flex: 1,
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
	registerText: {
		marginTop: 20,
		textAlign: 'center',
	},
	registerLink: {
		color: 'blue',
		textDecorationLine: 'underline',
	},
});
