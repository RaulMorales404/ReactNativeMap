import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { PermissionsContext } from '../context/PermissonsContex'
import CustomButton from '../components/customButton/CustomButton';

const Permises = () => {

    const { permissions, askLocationPermission } = useContext(PermissionsContext);


    return (
        <View style={{ ...styles.container }}>
            <Text>
                Permises
            </Text>
            <CustomButton
                text="Solicitar Permisos"
                action={askLocationPermission}

            />

            <Text style={{ color: '#000' }}>
                {
                    JSON.stringify(permissions, null, 5)
                }
            </Text>
        </View>
    )
}

export default Permises
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})