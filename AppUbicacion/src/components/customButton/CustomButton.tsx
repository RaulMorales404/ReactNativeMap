import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
    text: string,
    action: () => void
}
const CustomButton = ({ text, action }: Props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.button }}
            activeOpacity={0.8}
            onPress={() => action()}>
            <Text style={{ ...styles.textButton }}>
                {text}
            </Text>

        </TouchableOpacity>
    )
}

export default CustomButton
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        padding: 13,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    textButton: {
        color: "#fff"
    }

})