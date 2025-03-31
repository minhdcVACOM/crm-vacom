import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { VcConstant } from '@/utils/constant';
import VcPress from '@/components/vcPress';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import React from 'react';
import VcDrawerContent from '@/components/vcDrawerContent';
const getDrawerIcon = (IconComponent: any, name: string) => ({ size, color }: any) => (
    <IconComponent name={name} size={size} color={color} />
);
const screens = [
    { name: "index", label: "Trang chủ", icon: getDrawerIcon(Entypo, "home") },
    { name: "public", label: "Menu chung", icon: getDrawerIcon(Ionicons, "document") },
    { name: "maintain", label: "Triển khai", icon: getDrawerIcon(Ionicons, "logo-codepen") },
    { name: "business", label: "Kinh doanh", icon: getDrawerIcon(Ionicons, "business-sharp") },
    { name: "infoTech", label: "Lập trình", icon: getDrawerIcon(Ionicons, "code-working-sharp") },
    { name: "(tabs)", label: "Báo cáo", icon: getDrawerIcon(Ionicons, "bar-chart") },
    { name: "system", label: "Hệ thống", icon: getDrawerIcon(FontAwesome, "cogs") },
];

const renderDrawerContent = (props: any) => <VcDrawerContent {...props} />;
const CustomHeader = ({ navigation }: any) => {
    const toggleDrawer = useCallback(() => navigation.toggleDrawer(), [navigation]);
    return (
        <VcPress
            skin="primary"
            style={{ position: "absolute", top: 10, left: 10, width: 40 }}
            pressStyle={{ padding: 5 }}
            onPress={toggleDrawer}
        >
            <AntDesign name="menu-fold" size={24} color="white" />
        </VcPress>
    )
};
const LayoutDrawer = () => {
    return (
        <Drawer
            drawerContent={renderDrawerContent}
            screenOptions={{
                header: (props) => <CustomHeader {...props} />
            }}
        >
            {screens.map(({ name, label, icon }) => (
                <Drawer.Screen
                    key={name}
                    name={name}
                    options={{
                        drawerLabel: label,
                        drawerIcon: icon,
                        drawerActiveTintColor: VcConstant.colors.primary,
                        drawerActiveBackgroundColor: VcConstant.colors.primaryLight,
                        drawerItemStyle: { borderRadius: 15 },
                        drawerStyle: { width: 280 },
                        headerStyle: { height: 50 }
                    }}
                />
            ))}
        </Drawer>
    );
}


export default LayoutDrawer;
