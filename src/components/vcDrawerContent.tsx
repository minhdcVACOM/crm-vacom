import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import empty_logo from "@/assets/images/empty_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { VcApi, VcConstant } from "@/utils/constant";
import { IVcStore } from "@/redux/vcStore";
import { getApi } from "@/utils/api";
import { setLogo } from "@/redux/vcSlice";
import VcPress from "./vcPress";
import { VcText } from "./vcText";
import VcDrawerItem from "./vcDrawerItem";
import { usePopup } from "./dialog/popupProvider";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const styles = StyleSheet.create({
    header: {
        backgroundColor: VcConstant.colors.primary
    },
    logo: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        gap: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: VcConstant.colors.purple
    },
    content: {
        flex: 1
    },
    footer: {
        flexDirection: "row",
        borderTopWidth: 0.2,
        justifyContent: "space-between",
        borderTopColor: VcConstant.colors.primaryDark
    }
});
const VcDrawerContent = (props: any) => {
    const { state, navigation, descriptors } = props;
    const logo = useSelector((state: IVcStore) => state.app.logo)
    const orgUnit = useSelector((state: IVcStore) => state.app.orgUnit)
    const userInfo = useSelector((state: IVcStore) => state.app.userInfo)
    const { showPopup } = usePopup();
    const [refresh, setRefresh] = useState<boolean>(false);
    const dispatch = useDispatch();
    const clickSetting = useCallback(() => {
        router.navigate({ pathname: "/setting" });
        setTimeout(() => { navigation.closeDrawer() }, 500);
    }, []);
    const clickLogout = useCallback(() => {
        showPopup({
            message: "Bạn có muốn đăng xuất không?",
            iconType: "question",
            confirmText: "Đăng xuất",
            cancelText: "Không",
            onConfirm: () => router.replace('/login'),
            showCancel: true
        });
    }, []);
    useEffect(() => {
        getApi({
            link: VcApi.api.login.getUserPic,
            callBack: (res) => {
                dispatch(setLogo(res.data));
            }
        })
    }, [refresh]);
    return (
        <View style={{ flex: 1 }}>

            <View style={{ backgroundColor: VcConstant.colors.primary, borderBottomWidth: 0.2, borderBottomColor: VcConstant.colors.primaryDark }}>
                <View style={styles.logo}>
                    <View style={{ width: 100, height: 100 }}>
                        <Image style={styles.image} source={logo ? { uri: logo } : empty_logo} />
                        <VcPress skin="default"
                            style={{ backgroundColor: "#fff", position: "absolute", bottom: 10, right: 0 }}
                            pressStyle={{ padding: 0 }}
                            onPress={() => setRefresh(!refresh)}
                        >
                            <Ionicons name="refresh-circle" size={24} color={VcConstant.colors.purple} />
                        </VcPress>
                    </View>
                    <VcPress
                        title={orgUnit?.code}
                        pressStyle={{ backgroundColor: "#fff", padding: 5 }}
                        onPress={() => {
                            router.replace({
                                pathname: "/listOrgUnit"
                            });
                        }}
                        style={{ position: "absolute", right: 10, alignSelf: "center" }}
                    />
                </View>
                <VcText type="subHeader" style={{ color: "#fff", textAlign: "center" }} text={userInfo?.username ?? ""} />
            </View>
            <View style={styles.content}>
                {/* <DrawerContentScrollView {...props}> */}
                {/* <DrawerItemList {...props} /> */}
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;
                    const { drawerLabel, drawerIcon } = descriptors[route.key].options;
                    return (
                        <VcDrawerItem
                            key={route.key}
                            label={drawerLabel || route.name}
                            setIcon={drawerIcon}
                            isActive={isFocused}
                            onPress={() => {
                                navigation.navigate(route.name);
                            }}
                        />
                    );
                })}
                {/* </DrawerContentScrollView> */}
            </View>
            <View style={styles.footer}>
                <VcDrawerItem
                    label="Cài đặt"
                    setIcon={({ size, color }) => (<Ionicons name="settings" size={size} color={VcConstant.colors.primaryDark} />)}
                    onPress={clickSetting}
                    style={{ flex: 1 }}
                />
                <VcDrawerItem
                    label=""
                    setIcon={({ size, color }) => (<MaterialCommunityIcons name="web" size={size} color={VcConstant.colors.blue} />)}
                    onPress={() => router.navigate("/webViewer")}
                    style={{ width: 60 }}
                />
                <VcDrawerItem
                    label=""
                    setIcon={({ size, color }) => (<AntDesign name="logout" size={size} color={VcConstant.colors.purple} />)}
                    onPress={clickLogout}
                    style={{ width: 60 }}
                />
            </View>
        </View>
    );
}
export default VcDrawerContent;