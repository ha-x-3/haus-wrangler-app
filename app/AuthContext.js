import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { decode as atob } from 'base-64';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkAuthentication();
	}, []);

	const checkAuthentication = async () => {
		const token = await AsyncStorage.getItem('user');
		console.log(token);
		if (token) {
			try {
				const decodedToken = decodeJWT(token);
				if (decodedToken) {
					const { username } = decodedToken;
					setUser(username);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error('Error verifying token:', error);
				setUser(null);
			}
		} else {
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
				AsyncStorage.setItem('user', token);
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
			const token = await AsyncStorage.getItem('user');
			await axios.post('http://localhost:8080/api/logout', null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			AsyncStorage.removeItem('user');
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
			value={{ user, login, logout, checkAuthentication }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export { AuthContext };