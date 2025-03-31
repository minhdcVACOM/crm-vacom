import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Dimensions } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

const { width } = Dimensions.get('window');
const marginSide = 20;
let toastInstance: any = null;

export const showToast = (message: string, options: any = {}) => {
    const {
        duration = 2000,
        position = 'top', // 'top', 'center', 'bottom'
        backgroundColor = '#333',
        textColor = '#fff',
        fontSize = 16,
        borderRadius = 10,
    } = options;

    if (toastInstance) {
        toastInstance.destroy();
    }

    toastInstance = new RootSiblings(
        <ToastContent
            message={message}
            duration={duration}
            position={position}
            backgroundColor={backgroundColor}
            textColor={textColor}
            fontSize={fontSize}
            borderRadius={borderRadius}
        />
    );
};

const ToastContent = ({
    message,
    duration,
    position,
    backgroundColor,
    textColor,
    fontSize,
    borderRadius,
}: any) => {
    const slideAnim = useRef(new Animated.Value(position === 'top' ? -marginSide : marginSide)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Show animation
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto hide after duration
        const timeout = setTimeout(() => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: position === 'top' ? -marginSide : marginSide,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                toastInstance.destroy();
                toastInstance = null;
            });
        }, duration);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    backgroundColor,
                    borderRadius,
                    bottom: position === 'bottom' ? marginSide : undefined,
                    top: position === 'top' ? marginSide : position === 'center' ? '50%' : undefined,
                    alignSelf: 'center',
                    transform: [{ translateY: slideAnim }],
                    opacity,
                },
            ]}
        >
            <Text style={{ color: textColor, fontSize }}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
        maxWidth: width * 0.8,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
});
