import {
	View,
	ImageBackground,
	Image,
	Pressable,
	Text,
	StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';

export default function Page() {
	const router = useRouter();
	const logoText = require('../assets/HausWranglerText.png');
	const logo = require('../assets/HausWrangler.png');
	const background = require('../assets/loftLeft.png');
	const { user, logout } = useAuth();

	const handleLogin = () => {
		router.push('/screens/Login');
	};

	const handleLogout = async () => {
		try {
			await logout();
			router.push('/screens/Login');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={background}
				resizeMode='cover'
				style={styles.background}
			>
				<Image
					source={logoText}
					style={styles.logoText}
				/>
				<Image
					source={logo}
					style={styles.logo}
				/>
				{user ? (
					<Pressable
						onPress={handleLogout}
						style={styles.loginBtn}
					>
						<Text style={styles.loginText}>Logout</Text>
					</Pressable>
				) : (
					<Pressable
						onPress={handleLogin}
						style={styles.loginBtn}
					>
						<Text style={styles.loginText}>Login</Text>
					</Pressable>
				)}
				<Pressable style={styles.registerBtn}>
					<Text style={styles.registerText}>Register New User</Text>
				</Pressable>
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
	logoText: {
		height: 100,
		width: '100%',
		marginBottom: 30,
		marginTop: -110,
	},
	logo: {
		height: 284,
		width: 286,
		marginBottom: 60,
	},
	loginBtn: {
		height: 48,
		width: 241,
		backgroundColor: '#35414D',
		borderRadius: 4,
	},
	loginText: {
		color: 'white',
		textAlign: 'center',
		paddingTop: 14,
		fontWeight: 'bold',
		fontSize: 16,
	},
	registerBtn: {
		marginTop: 30,
		height: 48,
		width: 241,
		backgroundColor: '#869C71',
		borderRadius: 4,
	},
	registerText: {
		color: 'white',
		textAlign: 'center',
		paddingTop: 14,
		fontWeight: 'bold',
		fontSize: 16,
	},
});
