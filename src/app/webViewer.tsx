import { VcConstant } from '@/utils/constant';
import React, { useState, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewer = () => {
    const url = 'https://vacom.com.vn';
    const [loading, setLoading] = useState(true);
    const [canGoBack, setCanGoBack] = useState(false);
    const webViewRef = useRef<WebView | null>(null);

    return (
        <View style={styles.container}>
            {/* WebView */}
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
                style={styles.webview}
            />

            {/* Hiển thị Loading Indicator khi trang đang tải */}
            {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

            {/* Nút quay lại trang trước */}
            {canGoBack && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => webViewRef.current?.goBack()}
                >
                    <Text style={styles.backText}>◀ Quay lại</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    webview: { flex: 1 },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -15 }],
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: VcConstant.colors.primaryDark,
        padding: 10,
        borderRadius: 8,
    },
    backText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WebViewer;
