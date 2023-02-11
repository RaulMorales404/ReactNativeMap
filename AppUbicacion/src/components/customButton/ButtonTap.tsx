import React from 'react'
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string,
    styleBtn: StyleProp<ViewStyle>,
    action: () => void,
}

const ButtonTab = ({ iconName, styleBtn, action }: Props) => {

    return (
        <TouchableOpacity
            style={styleBtn}
            activeOpacity={0.8}
            onPress={() => action()}
        >
            <Icon
                // style={{ left: 1 }}
                name={iconName}
                color="#fff" size={25}
            />
        </TouchableOpacity>
    )
}

export default ButtonTab;
