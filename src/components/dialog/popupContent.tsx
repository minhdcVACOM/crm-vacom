import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    BackHandler,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { VcConstant } from '@/utils/constant';
import VcTextInput from '../vcTextInput';
import VcPress from '../vcPress';
const getIconColor = {
    success: VcConstant.colors.success,
    warning: VcConstant.colors.warning,
    error: VcConstant.colors.error,
    info: VcConstant.colors.info,
    question: VcConstant.colors.question,
    none: VcConstant.colors.primary
}
const { width, height } = Dimensions.get('window');

interface PopupContentProps {
    title?: string;
    message?: string;
    backgroundColor?: string;
    textColor?: string;
    iconType?: 'success' | 'warning' | 'error' | 'info' | 'question' | 'none';
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    inputLabel?: string;
    inputPlaceholder?: string;
    inputDefaultValue?: string;
    showInput?: boolean;
    onConfirm?: (inputText: string) => void;
    onClose?: () => void;
}

export const PopupContent = ({
    title,
    message,
    backgroundColor = '#fff',
    textColor = '#000',
    iconType = 'none',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy bỏ',
    showCancel = false,
    inputLabel = '',
    inputPlaceholder = '',
    inputDefaultValue = '',
    showInput = false,
    onConfirm,
    onClose,
}: PopupContentProps) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const iconAnim = useRef(new Animated.Value(0)).current;
    const [inputText, setInputText] = useState(inputDefaultValue);

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(iconAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose?.();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const getIcon = () => {
        let iconName: "checkmark-circle" | "warning" | "close-circle" | "information-circle" | "help-circle" | null = null;
        const iconColor = getIconColor[iconType];
        switch (iconType) {
            case 'success':
                iconName = 'checkmark-circle';
                break;
            case 'warning':
                iconName = 'warning';
                break;
            case 'error':
                iconName = 'close-circle';
                break;
            case 'info':
                iconName = 'information-circle';
                break;
            case 'question':
                iconName = 'help-circle';
                break;
            default:
                return null;
        }

        return (
            <Animated.View
                style={{
                    transform: [
                        {
                            scale: iconAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            }),
                        },
                    ],
                    marginBottom: 10,
                }}
            >
                {iconName && <Ionicons name={iconName} size={100} color={iconColor} />}
            </Animated.View>
        );
    };

    // Xử lý vuốt xuống
    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: translateY } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.END) {
            if (event.nativeEvent.translationY > 100) {
                // Nếu vuốt xuống quá 100px, đóng popup
                Animated.timing(translateY, {
                    toValue: height,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => {
                    onClose?.();
                });
            } else {
                // Nếu vuốt chưa đủ xa, reset lại vị trí ban đầu
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            styles.popupContainer,
                            {
                                backgroundColor,
                                transform: [{ translateY }, { scale: scaleAnim }],
                                opacity: opacityAnim,
                            },
                        ]}
                    >
                        <View style={styles.dragIndicator} />
                        <View style={{ alignItems: "center" }}>
                            {getIcon()}
                        </View>

                        {/* Tiêu đề */}
                        {title && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}

                        {/* Nội dung */}
                        {message && <Text style={[styles.message, { color: textColor }]}>{message}</Text>}

                        {/* Input */}
                        {showInput && (
                            <VcTextInput
                                placeholder={inputPlaceholder}
                                value={inputText}
                                onChangeText={setInputText}
                                label={inputLabel}
                                style={{ marginTop: inputLabel ? 20 : 10 }}
                            />
                        )}

                        {/* Nút xác nhận */}
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
                            {showCancel && <VcPress skin='secondary' title={cancelText}
                                style={{ borderRadius: 6, marginTop: 10 }}
                                pressStyle={
                                    { padding: 5, borderRadius: 6, borderWidth: 1, borderColor: getIconColor[iconType] }
                                }
                                onPress={() => {
                                    onClose?.();
                                }}
                            />}
                            <VcPress skin='primary' title={confirmText}
                                style={{ borderRadius: 6, marginTop: 10 }}
                                pressStyle={
                                    { padding: 5, borderRadius: 6, backgroundColor: getIconColor[iconType], borderWidth: 0 }
                                }
                                onPress={() => {
                                    onConfirm?.(inputText);
                                    onClose?.();
                                }}
                            />
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: width * 0.8,
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderRadius: 10,
        elevation: 5,
        // alignItems: 'center', // Căn giữa nội dung
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
    },
    button: {
        backgroundColor: VcConstant.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
    },
    dragIndicator: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 10,
    },
});
