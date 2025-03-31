import { VcConstant } from '@/utils/constant';
import React, { ReactNode } from 'react';
import { Pressable, Platform, View, StyleSheet, StyleProp, ViewStyle, Text, TextStyle, ActivityIndicator } from 'react-native'
const borderRadius = 50;
interface IProgs {
    title?: string;
    children?: ReactNode;
    onPress?: () => void;
    androidRipple?: boolean;
    style?: StyleProp<ViewStyle>;
    pressStyle?: StyleProp<ViewStyle>;
    skin?: 'default' | 'primary' | 'secondary',
    loading?: boolean;
}
const VcPress = ({
    title,
    children,
    onPress,
    androidRipple = true,
    style,
    pressStyle,
    skin = "default",
    loading
}: IProgs) => {
    return (
        <View style={[{ borderRadius: borderRadius, overflow: 'hidden' }, style]}>
            <Pressable
                onPress={() => { if (!loading && onPress) onPress(); }}
                android_ripple={androidRipple ? { color: 'rgba(51,51,51,0.1)' } : null}
                style={({ pressed }) => [
                    styles.pressStyle,
                    styles[skin],
                    pressStyle,
                    Platform.OS === 'ios' && pressed ? styles.pressed : null
                ]}
            >
                {title && <Text style={[{ textAlign: "center", fontSize: 16 }, styles[`${skin}Text`] as StyleProp<TextStyle>]}>{title}</Text>}
                {children}
                {loading && <ActivityIndicator style={styles.loading} size={"large"} color={(styles[`${skin}Text`] as TextStyle)?.color} />}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: VcConstant.layout.opacity,
    },
    pressStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: borderRadius,
        padding: VcConstant.layout.padding,
    },
    loading: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    },
    default: {

    },
    defaultText: {
        color: VcConstant.colors.black
    },
    primary: {
        backgroundColor: VcConstant.colors.primary,
        borderWidth: VcConstant.layout.borderWidth,
        borderColor: VcConstant.colors.primaryDark
    },
    primaryText: {
        color: VcConstant.colors.white
    },
    secondary: {
        backgroundColor: VcConstant.colors.primaryLight,
        borderWidth: VcConstant.layout.borderWidth,
        borderColor: VcConstant.colors.primary
    },
    secondaryText: {
        color: VcConstant.colors.black
    }
});
export default VcPress;
