import React, { useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    BackHandler,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    backgroundColor?: string;
    widthPercent?: number
}

const VcModal = ({ visible, onClose, children, backgroundColor = '#fff', widthPercent }: ModalProps) => {
    const translateY = useRef(new Animated.Value(height)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const modalHeight = 'auto';
    const modalWidth = widthPercent ? width * widthPercent : 'auto';

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.timing(translateY, {
                toValue: height,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose();
            return true;
        });

        return () => backHandler.remove();
    }, [visible]);

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: translateY } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.END) {
            if (event.nativeEvent.translationY > 100) {
                Animated.timing(translateY, {
                    toValue: height,
                    duration: 200,
                    useNativeDriver: true,
                }).start(onClose);
            } else {
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            backgroundColor,
                            transform: [{ translateY }],
                            opacity: opacityAnim,
                            alignSelf: 'center',
                            minHeight: modalHeight,
                            // maxWidth: width * 0.9,
                            width: modalWidth,
                            borderRadius: 10,
                        },
                    ]}
                >
                    <View style={styles.dragIndicator} />
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </View>
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
    modalContainer: {
        padding: 20,
        elevation: 5,
    },
    dragIndicator: {
        position: "absolute",
        top: 5,
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 10,
    },
});

export default VcModal;