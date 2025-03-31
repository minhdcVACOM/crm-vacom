import VcPress from "@/components/vcPress";
import VcSearchBar from "@/components/vcSearchBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getApi } from "@/utils/api";
import { VcApi, VcConstant } from "@/utils/constant";
import { router, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { VcText } from "@/components/vcText";
import { setOrgUnit } from "@/redux/vcSlice";
interface IData {
    id: string,
    code: string,
    taxCode: string,
    name: string,
    address: string
}
const ListOrgUnit = () => {
    // const orgUnit = useSelector((state: IVcStore) => state.app.orgUnit)
    const [txtSearch, setTxtSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IData[]>([]);
    const getData = () => {
        setData([]);
        getApi({
            link: VcApi.api.login.getListOrgUnit,
            callBack: (res: IData[]) => setData(res),
            setLoading: (loading) => setLoading(loading)
        })
    };
    useEffect(() => {
        getData();
        //
        const backAction = () => {
            router.replace("/");
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);
    return (
        <>
            <VcText type="header" style={{ textAlign: "center", padding: 20, backgroundColor: VcConstant.colors.primary, color: "#fff" }} text='Chọn đơn vị' />
            <VcSearchBar value={txtSearch} onSearch={setTxtSearch} onBack={() => router.replace("/")} />
            <FlatList
                data={data}
                renderItem={
                    ({ item, index, separators }) => {
                        if (item.name.toUpperCase().includes(txtSearch.toUpperCase().trim().replace(/\s/g, ""))) {
                            return <ItemView item={item} />;
                        } else {
                            return null;
                        }
                    }
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => getData()}
                        colors={[VcConstant.colors.primary]}
                    />
                }
            />
        </>
    );
}
interface IProgs {
    item: IData
}
const ItemView = ({ item }: IProgs) => {
    const dispatch = useDispatch();
    const onPress = () => {
        dispatch(setOrgUnit(item));
        router.replace("/(drawer)");
    }
    return (
        <VcPress style={styles.item}
            onPress={onPress}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, gap: 10, alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                        <VcText type="title" style={{ color: VcConstant.colors.primary }} text={item.code} />
                        <VcText type="title" text={" - " + item.taxCode} />
                    </View>
                    <VcText type="subTitle" text={item.name} />
                    <VcText text={item.address} />
                </View>
                <AntDesign name="arrowright" size={30} color={VcConstant.colors.purple} />
            </View>
        </VcPress>
    );
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        margin: 10,
        borderWidth: 0.5,
        borderLeftWidth: 5,
        borderLeftColor: VcConstant.colors.primaryDark
    }
});
export default ListOrgUnit;