import React from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { VcConstant } from '@/utils/constant';
const { width } = Dimensions.get('window');

export default function Layout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="add" options={{ title: 'Add' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const indicatorPosition = useSharedValue(0);

    React.useEffect(() => {
        indicatorPosition.value = withTiming((width / state.routes.length) * state.index, { duration: 300 });
    }, [state.index]);

    return (
        <View
            style={{
                flexDirection: 'row',
                height: 70,
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                alignItems: 'center',
                elevation: 10,
            }}
        >
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    height: 4,
                    width: width / state.routes.length,
                    backgroundColor: VcConstant.colors.primaryDark,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    transform: [{ translateX: indicatorPosition }],
                }}
            />

            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const iconName =
                    route.name === 'index'
                        ? 'newspaper-outline'
                        : route.name === 'add'
                            ? 'add-circle-outline'
                            : 'business-outline';

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            paddingVertical: 8,
                        }}
                    >
                        <Ionicons name={iconName} size={24} color={isFocused ? VcConstant.colors.primaryDark : 'gray'} />
                        <Text style={{ color: isFocused ? VcConstant.colors.primaryDark : 'gray', marginTop: 4 }}>
                            {descriptors[route.key].options.title}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
