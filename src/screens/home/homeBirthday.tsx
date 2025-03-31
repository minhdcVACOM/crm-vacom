import { apiGetDashboardCode } from "@/utils/apiHome";
import { Helper } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import empty_logo from "@/assets/images/empty_logo.png";
import { VcConstant } from "@/utils/constant";
import { loginHelper } from "@/utils/hooks/loginHelper";
import VcCard from "@/components/vcCard";
import { VcText } from "@/components/vcText";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        backgroundColor: VcConstant.colors.primaryLight,
        padding: 10,
        alignItems: "center",
        gap: 10,
        marginHorizontal: 10,
        borderRadius: 10
    },
    titleFlatList: {
        // color: "#fff",
        fontWeight: "bold",
        margin: 10,
        fontSize: 18,
        paddingLeft: 20
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: "center",
        height: 120,
        gap: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: VcConstant.colors.primaryDark
    }
})
interface IData {
    id: string,
    userId: string,
    name: string,
    imgSrc: string,
    birthDay: string,
}
const HomeBirthday = ({ gestureHandler }: any) => {
    const { getLinkApi } = loginHelper();
    const [data, setData] = useState<IData[]>([]);
    useEffect(() => {
        const getDataBirthDay = async () => {
            const baseUrl = await getLinkApi();
            await apiGetDashboardCode("TPL_LST_EMPLOYEE_BIRTHDAY", res => {
                res.data.forEach((item: any) => item.imgSrc = baseUrl + item.imgSrc);
                setData(res.data)
            });
        }
        getDataBirthDay();
    }, []);
    return (
        <VcCard style={styles.card}>
            <VcText type="subTitle" text="Sinh nhật" style={{ alignSelf: "center", borderBottomWidth: 0.5 }} />
            <PanGestureHandler simultaneousHandlers={gestureHandler}>
                <ScrollView
                    ref={gestureHandler}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                >
                    {data.map((item, index) => {
                        const isHaveLogo = item.imgSrc.includes("roman-clip-art") ? false : true;
                        return (
                            <View key={index + ""} style={styles.item}>
                                <Image style={styles.image} source={isHaveLogo ? { uri: item.imgSrc } : empty_logo} />
                                <View>
                                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                                    <Text style={{ color: VcConstant.colors.primaryDark, fontStyle: "italic" }}>{Helper.formatDate(item.birthDay)}</Text>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </PanGestureHandler>
        </VcCard>
    );
}
export default HomeBirthday;