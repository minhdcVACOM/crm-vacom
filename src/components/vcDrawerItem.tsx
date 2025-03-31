import React, { ReactNode } from 'react';
import { Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import VcPress from './vcPress';
import { VcConstant } from '@/utils/constant';
interface IProgIcon {
    focused: boolean,
    size: number,
    color: string
}
interface IProps {
    label: string;
    setIcon?: ({ focused, size, color }: IProgIcon) => ReactNode;
    onPress: () => void;
    isActive?: boolean;
    style?: StyleProp<ViewStyle>
}

const VcDrawerItem: React.FC<IProps> = ({
    label,
    setIcon,
    onPress,
    isActive = false,
    style
}) => {
    return (
        <VcPress
            onPress={onPress}
            style={[styles.pressStyle, { backgroundColor: isActive ? VcConstant.colors.primaryLight : "transparent" }, style]}
            pressStyle={{ justifyContent: "flex-start" }}
        >
            <View style={styles.itemContainer}>
                {setIcon && setIcon({ focused: isActive, color: isActive ? VcConstant.colors.primaryDark : '#333', size: 24 })}
                <Text style={[styles.label, { color: isActive ? VcConstant.colors.primaryDark : '#333' }]}>{label}</Text>
            </View>
        </VcPress>
    );
};

const styles = StyleSheet.create({
    pressStyle: {
        borderRadius: 0
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        padding: 10,
        gap: 15
    },
    label: {
        fontSize: 16,
    },
});

export default VcDrawerItem;
