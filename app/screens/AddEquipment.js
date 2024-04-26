import { ImageBackground, View, StyleSheet } from 'react-native';
import AddEquipmentForm from '../components/EquipmentForm';
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
                <View style={styles.equipmentForm}>
                    <AddEquipmentForm />
                </View>
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
    equipmentForm: {
        marginTop: 400,
        height: '30%',
    },
    equipmentTable: {
        width: '85%',
        height: '100%',
    },
});
