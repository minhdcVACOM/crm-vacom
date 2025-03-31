import VcBackButton from "@/components/vcBackButton";
import VcHeader from "@/components/vcHeader";
import VcPress from "@/components/vcPress";
import { VcApi, VcConstant } from "@/utils/constant";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import empty_logo from "@/assets/images/empty_logo.png";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { IVcStore } from "@/redux/vcStore";
import { VcText } from "@/components/vcText";
import VcExpand from "@/components/vcExpand";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getApi } from "@/utils/api";
import VcModal from "@/components/vcModal";
import ModalCamera from "@/modalViews/modalCamera";
import ModalChangeName from "@/modalViews/modalChangeName";
import ModalChangePass from "@/modalViews/modalChangePass";

enum viewType {
    none,
    camera,
    changeName,
    changePass
}

interface IDataRole {
    name: string // Danh sách các chuỗi cần hiển thị
}

const Setting = () => {
    const logo = useSelector((state: IVcStore) => state.app.logo);
    const userInfo = useSelector((state: IVcStore) => state.app.userInfo);
    const [dataRole, setDataRole] = useState<IDataRole[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [typeViewModal, setTypeViewModal] = useState(viewType.none);

    const renderViewModel = useMemo(() => {
        switch (typeViewModal) {
            case viewType.camera:
                return <ModalCamera setModalVisible={setModalVisible} />
            case viewType.changeName:
                return <ModalChangeName setModalVisible={setModalVisible} />
            case viewType.changePass:
                return <ModalChangePass setModalVisible={setModalVisible} />
            default:
                return <View />
        }
    }, [typeViewModal]);

    useEffect(() => {
        getApi({
            link: VcApi.api.setting.getCurrentRole,
            callBack: (res) => setDataRole(res)
        });
    }, [])
    return (
        <>
            <View style={{ alignItems: 'center', backgroundColor: "#fff" }}>
                <VcBackButton />
                <VcHeader title="Tài khoản" />
                <View style={{ width: 100, height: 100 }}>
                    <Image style={styles.image} source={logo ? { uri: logo } : empty_logo} />
                    <VcPress skin="default"
                        style={{ backgroundColor: "#fff", position: "absolute", bottom: 10, right: -5 }}
                        pressStyle={{ padding: 2 }}
                        onPress={() => {
                            setModalVisible(true);
                            setTypeViewModal(viewType.camera);
                        }}
                    >
                        <Ionicons name="camera" size={24} color={VcConstant.colors.purple} />
                    </VcPress>
                </View>
                <VcText type="subText" style={{ fontSize: 20 }} text={userInfo?.username ?? ""} />
            </View>
            <View style={{ gap: 10, paddingHorizontal: 10 }}>
                <VcExpand title="Nhóm quyền" isExpanded={true}>
                    <ScrollText data={dataRole} />
                </VcExpand>
                <VcPress pressStyle={styles.pressStyle} onPress={() => {
                    setModalVisible(true);
                    setTypeViewModal(viewType.changeName);
                }}>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <FontAwesome5 name="user-alt" size={24} color="blue" />
                        <VcText type="subTitle" text="Sửa thông tin" />
                    </View>
                </VcPress>
                <VcPress pressStyle={styles.pressStyle} onPress={() => {
                    setModalVisible(true);
                    setTypeViewModal(viewType.changePass);
                }}>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <MaterialIcons name="key" size={24} color="red" />
                        <VcText type="subTitle" text="Đổi mật khẩu" />
                    </View>
                </VcPress>
            </View>
            <VcModal widthPercent={typeViewModal === viewType.camera ? 0.5 : 0.9} visible={modalVisible} onClose={() => setModalVisible(false)}>
                {renderViewModel}
            </VcModal>
        </>
    )
}

const ScrollText = ({ data }: { data: IDataRole[] }) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {data.map((item, index) => (
                    <Text key={index} style={styles.textItem}>
                        {item.name}
                    </Text>
                ))}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    pressStyle: {
        justifyContent: "flex-start",
        paddingLeft: 50,
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderColor: VcConstant.colors.purple
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: VcConstant.colors.purple
    },
    container: {
        paddingVertical: 10
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textItem: {
        borderRadius: 10,
        borderWidth: 0.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        color: '#333',
        marginRight: 15, // Khoảng cách giữa các item
    },
})
export default Setting;