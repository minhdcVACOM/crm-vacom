import { usePopup } from "@/components/dialog/popupProvider";
import { VcConstant } from "@/utils/constant";
import { Helper } from "@/utils/helper";
import { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from 'react-native-gifted-charts';
const width = Dimensions.get("window").width;
const arrInfo = [
    { label: "Kế toán", color: VcConstant.colors.red },
    { label: "Bảo trì", color: VcConstant.colors.blue },
    { label: "Chữ ký số", color: VcConstant.colors.orange },
    { label: "Hóa đơn", color: VcConstant.colors.purple }
]
interface IData {
    month: number,
    qtyAcc: number,
    qtyInv: number,
    qtyMaintaince: number,
    qtyToken: number
}
interface IProgs {
    data: IData[],
    index: number
}
const HomeBarChart = (progs: IProgs) => {
    const { showPopup } = usePopup();
    const { data, index } = progs;
    const indexFrom = data.length > 3 ? data.length - 3 : 0;
    let barData: any = [];
    for (let i = indexFrom; i < data.length; i++) {
        const item = data[i];
        barData.push({
            value: item.qtyAcc,
            label: item.month,
            spacing: 1,
            labelWidth: 62,
            labelTextStyle: { color: 'gray' },
            frontColor: arrInfo[0].color,
            title: arrInfo[0].label
        });
        barData.push({ value: item.qtyInv, frontColor: arrInfo[1].color, title: arrInfo[1].label });
        barData.push({ value: item.qtyMaintaince, frontColor: arrInfo[2].color, title: arrInfo[2].label });
        barData.push({ value: item.qtyToken, frontColor: arrInfo[3].color, title: arrInfo[3].label, spacing: 10 });
    }
    let maxValue = Math.max(...data.slice(indexFrom).flatMap(item => [
        item.qtyAcc, item.qtyInv, item.qtyMaintaince, item.qtyToken
    ]));
    maxValue += maxValue * 0.1;
    const renderTitle = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                {
                    arrInfo.map((item: any) => {
                        return (
                            <Text key={item.label} style={{ borderLeftWidth: 10, borderLeftColor: item.color, width: 100, marginBottom: 10 }}> {item.label}</Text>
                        );
                    })
                }
            </View>
        )
    }

    return (
        <View
            style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: VcConstant.colors.primary,
                backgroundColor: VcConstant.colors.primaryLight,
                margin: 5,
                paddingVertical: 9,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600", alignSelf: "center" }}>Hợp đồng qua các tháng</Text>
                <BarChart
                    data={barData}
                    barWidth={15}
                    spacing={1}
                    roundedTop
                    roundedBottom
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: 'gray' }}
                    noOfSections={5}
                    maxValue={maxValue}
                    height={width / 3 - 22}
                    onPress={(v: any) => {
                        // showPopup({
                        //     title: v.title,
                        //     message: " số lượng: " + v.value , v.frontColor
                        // });
                        Helper.toastShow(v.title + ": số lượng = " + v.value, true, v.frontColor);
                    }}
                />
            </View>
            {renderTitle()}
        </View>
    );
}
export default HomeBarChart;