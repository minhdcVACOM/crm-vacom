import { VcConstant } from "@/utils/constant";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const width = Dimensions.get("window").width + 10;

interface IData {
    text: string,
    value: number,
    color: string,
    label: string
}
interface IProgs {
    data: IData[],
    index: number
}
const HomePieChart = (progs: IProgs) => {
    const { data, index } = progs;
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "600", paddingBottom: 5 }}>Hợp đồng hết hạn trong tháng</Text>
                <PieChart
                    showText
                    textColor="black"
                    radius={width / 5 - 15}
                    textSize={20}
                    data={data}
                />
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                {
                    data.map(item => {
                        return (
                            <Text key={item.color} style={{ borderLeftWidth: 10, borderLeftColor: item.color, width: 100, marginBottom: 10 }}> {item.label}</Text>
                        );
                    })
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: VcConstant.colors.primaryDark,
        backgroundColor: VcConstant.colors.primaryLight,
        margin: 5
    }
})
export default HomePieChart;