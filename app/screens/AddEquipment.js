import { ImageBackground, View, StyleSheet } from 'react-native';
import EquipmentTable from '../components/EquipmentTable';

export default function AddEquipment() {

    const background = require('../../assets/Loft.jpg');

	return (
		<View style={styles.container}>
			<ImageBackground
				source={background}
				resizeMode='cover'
				style={styles.background}
            >
				<View style={styles.equipmentTable}>
					<EquipmentTable />
				</View>
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
    equipmentTable: {
        width: '80%',
        height: '100%',
    }
});
