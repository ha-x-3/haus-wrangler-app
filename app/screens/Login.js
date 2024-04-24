import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
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
			router.push('/EditScreen');
		} catch (error) {
			console.error('Error has occurred', error);
			alert('An error has occurred while logging in.');
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={background}
				resizeMode='cover'
				style={styles.background}
			>
				<Text style={styles.title}>Login</Text>
				<TextInput
					style={styles.input}
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
					keyboardType='email-address'
				/>
				<TextInput
					style={styles.input}
					placeholder='Password'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={handleLogin}
				>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
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
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		padding: 20,
		borderRadius: 10,
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
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	button: {
		backgroundColor: '#35414d',
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
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
