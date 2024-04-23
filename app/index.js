import { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Page() {

	const logoText = require('../assets/HausWranglerText.png');
	const logo = require('../assets/HausWrangler.png');
	const background = require('../assets/loftLeft.png');

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
				<TouchableOpacity style={styles.loginBtn}>
					<Text style={styles.loginText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.registerBtn}>
					<Text style={styles.registerText}>Register New User</Text>
				</TouchableOpacity>
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
	logoText: {
		height: 100,
		width: '100%',
		marginBottom: 30,
		marginTop: -60,
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