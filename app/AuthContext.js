import { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { decode as atob } from 'base-64';

const AuthContext = createContext();

const logToken = async () => {
	try {
		const token = await SecureStore.getItemAsync('token');
		console.log('Token from SecureStore:', token);
	} catch (error) {
		console.error('Error getting token from SecureStore:', error);
	}
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkAuthentication();
	}, []);

	const checkAuthentication = async () => {
		try {
			const token = await SecureStore.getItemAsync('token');
			if (token) {
				const decodedToken = decodeJWT(token);
				if (decodedToken) {
					const { username } = decodedToken;
					setUser(username);
				} else {
					setUser(null);
				}
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error('Error verifying token:', error);
			setUser(null);
		}
	};

	const login = async (email, password) => {
		try {
			const baseURL =
				Platform.OS === 'android'
					? 'http://10.0.2.2:8080/api/login'
					: 'http://localhost:8080/api/login';
			const response = await axios.post(
				baseURL,
				{ email, password },
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			if (response.data.accessToken) {
				const token = response.data.accessToken;
				await SecureStore.setItemAsync('token', token);
				checkAuthentication();
			} else {
				console.error('Invalid response format');
			}
		} catch (error) {
			console.error('Error logging in:', error);
			throw error;
		}
	};

	const logout = async (callback) => {
		try {
			await SecureStore.deleteItemAsync('token');
			setUser(null);
			if (callback) {
				callback();
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	const decodeJWT = (token) => {
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const decodedData = JSON.parse(atob(base64));
			const username = decodedData.sub;
			return { username };
		} catch (error) {
			console.error('Error decoding token:', error);
			return null;
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, login, logout, checkAuthentication, logToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export { AuthContext, logToken };
