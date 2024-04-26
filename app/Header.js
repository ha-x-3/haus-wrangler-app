import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';

const Header = () => {
	const { user, logout, checkAuthentication } = useAuth();
	const router = useRouter();

	useEffect(() => {
		checkAuthentication();
	}, [checkAuthentication]);

	const handleLogout = async () => {
		try {
			await logout();
			router.push('/screens/Login');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	const navigateToScreen = (screen) => {
		router.push(`/screens/${screen}`);
	};

	return (
		<View style={styles.container}>
			<View>
				<Pressable onPress={() => router.push('/')}>
					<Image
						source={require('../assets/HausWranglerIconText.png')}
						style={styles.logo}
					/>
				</Pressable>
			</View>
			<View>
				<View style={styles.navLinksContainer}>
					<View style={styles.navLinksRow}>
						<Pressable
							onPress={() => navigateToScreen('FilterChange')}
						>
							<Text style={styles.navLink}>Replace Filter</Text>
						</Pressable>
						<Pressable
							onPress={() => navigateToScreen('FilterHistory')}
						>
							<Text style={styles.navLink}>Filter History</Text>
						</Pressable>
					</View>
					<View style={styles.navLinksRow}>
						<Pressable
							onPress={() =>
								navigateToScreen('NotificationHistory')
							}
						>
							<Text style={styles.navLink}>
								Notification History
							</Text>
						</Pressable>
						<Pressable onPress={() => navigateToScreen('Edit')}>
							<Text style={styles.navLink}>Edit</Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.userNav}>
					{user ? (
						<>
							<Text style={styles.userGreeting}>
								Welcome, {user}
							</Text>
							<Pressable onPress={handleLogout}>
								<Text style={styles.logoutButton}>Logout</Text>
							</Pressable>
						</>
					) : (
						<Pressable onPress={() => navigateToScreen('Login')}>
							<Text style={styles.loginButton}>Login</Text>
						</Pressable>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#869C71',
		paddingTop: 40,
	},
	logo: {
		width: 140,
		height: 100,
	},
	navLinksContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	navLinksRow: {
		flexDirection: 'row',
		margin: 5,
	},
	navLink: {
		color: '#35414D',
		marginHorizontal: 10,
		fontWeight: 'bold',
	},
	userNav: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		paddingRight: 50,
	},
	userGreeting: {
		color: '#35414D',
		marginRight: 10,
		fontWeight: 'bold',
	},
	logoutButton: {
		backgroundColor: '#35414D',
		color: 'white',
		fontWeight: 'bold',
		padding: 5,
		borderRadius: 8,
	},
	loginButton: {
		backgroundColor: '#35414D',
		color: 'white',
		fontWeight: 'bold',
		padding: 5,
		borderRadius: 8,
	},
});

export default Header;
