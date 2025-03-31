
import CustomFlatList from "@/components/customFlatList/customFlatList";
import HomeHeader from "@/screens/home/homeHeader";
import HomeTopList from "@/screens/home/homeTopList";
import { apiGetDashboardCode } from "@/utils/apiHome";
import { VcConstant } from "@/utils/constant";
import React from "react";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView, StyleSheet, View } from "react-native";
interface IData {
    cusCode: string,
    cusName: string,
    count: number
}
const HomeScreen = () => {
    const [data, setData] = useState<IData[]>([]);
    useEffect(() => {
        apiGetDashboardCode("TB_CUS_SUPPORT_MAX", res => {
            setData(res.data)
        });
    }, []);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <CustomFlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.item}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }}>{item.cusCode}</Text>
                                    <Text style={{ color: "#333" }}>{item.cusName}</Text>
                                </View>
                                <Text style={{ fontWeight: "bold", fontSize: 20, color: VcConstant.colors.primary, paddingLeft: 10 }}>{item.count}</Text>
                            </View>
                        )
                    }}
                    HeaderComponent={<HomeHeader />}
                    StickyElementComponent={<View />}
                    TopListElementComponent={<HomeTopList />}
                />
            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden"
    },
    item: {
        marginBottom: 2,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    itemText: {
        fontWeight: "600",
    }
});
export default HomeScreen;