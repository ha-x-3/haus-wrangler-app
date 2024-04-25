import { createContext, useContext, useState, useEffect } from 'react';
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
			const response = await axios.post(
				'http://localhost:8080/api/login',
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
			callback();
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
