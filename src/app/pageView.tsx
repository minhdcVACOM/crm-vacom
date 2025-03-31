import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { VcConstant } from '@/utils/constant';
import VcPress from '@/components/vcPress';
import VcCard from '@/components/vcCard';
import PdfDownloadView from '@/components/pdfDownloadView';
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const SettingScreen = () => {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const largeHeaderStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, HEADER_MAX_HEIGHT],
            [HEADER_MAX_HEIGHT, 0],
            "clamp"
        );
        return {
            height
        };
    });
    const largeTitleStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT],
            [1, 0, 0],
            "clamp"
        );
        return {
            opacity
        };
    });

    const smallTitleStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, HEADER_MAX_HEIGHT],
            [HEADER_MAX_HEIGHT, 0],
            "clamp"
        );
        return {
            transform: [{ translateY }]
        };
    });
    const titleTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
            [0, 0, 1],
            "clamp"
        );
        return {
            opacity
        };
    });
    useEffect(() => {
        const backAction = () => {
            router.back();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);
    const dataPrint = {
        printTemplateId: "66416e454440575e82074311",
        typePrint: "pdf",
        lstVoucherId: null,
        dataObjectId: "67e9efa4934481e7f74a9968"
    }
    return (
        <>
            <PdfDownloadView link='/api/app/document/download/67db8d07f5729de6633291e3' type='download' />
            <PdfDownloadView link='/api/app/print-template' type='print' data={dataPrint} />
        </>
        //     <View style={styles.container}>
        //         {/* Large Header */}
        //         <Animated.View style={[styles.largeHeader, largeHeaderStyle]}>
        //             <Animated.Text style={[VcConstant.stylesText("header"), largeTitleStyle]}>Tiêu đề</Animated.Text>
        //         </Animated.View>
        //         {/* Small Title with Icon & Back Button */}
        //         <Animated.View style={[styles.smallTitleContainer, smallTitleStyle]}>
        //             <VcPress onPress={() => router.back()}>
        //                 <Ionicons name="arrow-back" size={24} color="#000" />
        //             </VcPress>
        //             <Animated.Text style={[styles.smallTitleText, titleTextStyle]}>Tiêu đề</Animated.Text>
        //         </Animated.View>

        //         {/* Scrollable Content */}
        //         <Animated.ScrollView
        //             contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT }}
        //             onScroll={scrollHandler}
        //             scrollEventThrottle={16}
        //         >
        //             {Array.from({ length: 20 }).map((_, index) => (
        //                 <VcCard key={index + ""} style={{ padding: 20, marginHorizontal: 10 }}>
        //                     <Text style={styles.itemText}>Khai báo {index + 1}</Text>
        //                 </VcCard>
        //             ))}
        //         </Animated.ScrollView>
        //     </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    largeHeader: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    smallTitleContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: HEADER_MIN_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        zIndex: 3,
        borderBottomWidth: VcConstant.layout.borderWidth,
        borderBottomColor: VcConstant.layout.borderColor,
    },
    backButton: {
        padding: 8,
    },
    smallTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
    },
    rightIcon: {
        marginRight: 8,
    },
    item: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: VcConstant.layout.borderColor,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 16,
    },
});

export default SettingScreen;
