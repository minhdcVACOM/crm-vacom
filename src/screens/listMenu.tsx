import VcPress from "@/components/vcPress";
import VcSparator from "@/components/vcSeparator";
import { setCurrentMenu } from "@/redux/vcSlice";

import { VcConstant } from "@/utils/constant";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import { SectionList, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Title } from "react-native-paper";
import { useDispatch } from "react-redux";
interface IProgs {
    data: any[]
}
const ListMenu = ({ data }: IProgs) => {
    return (
        <SectionList
            sections={data}
            keyExtractor={(item, index) => item.menuId}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
            renderSectionHeader={({ section: { title } }) => renderSectionHeader(title)}
            ItemSeparatorComponent={(progs) => <VcSparator />}
        />
    );
}
const renderSectionHeader = (title: string, icon?: React.ReactNode) => {
    return (
        <View style={styles.header}>
            {icon || <AntDesign name="bars" size={24} color="#fff" />}
            <Text style={{ flex: 1, color: "#fff" }}>{title}</Text>
        </View>
    );
}
interface IRenderItem {
    title: string;
    menuId: string;
    quickSearch?: boolean;
    fieldSearch?: string;
    marginBottom?: number;
}
const renderItem = (item: IRenderItem) => {
    const dispatch = useDispatch();
    const styleAdd: StyleProp<ViewStyle> = !item.marginBottom ? {} :
        {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        };
    return (
        <View style={[{ marginBottom: item.marginBottom ?? 0, marginLeft: 10, backgroundColor: "#fff" }, styleAdd]}>
            <VcPress pressStyle={{ justifyContent: "flex-start" }} style={[{ borderRadius: 0 }, styleAdd]}
                onPress={() => {
                    dispatch(setCurrentMenu(item));
                    router.navigate("/viewData");
                }}
            >
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                    <FontAwesome name="long-arrow-right" size={24} color="gray" />
                    <Text>{item.title}</Text>
                </View>
            </VcPress>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: VcConstant.colors.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        gap: 5
    }
});
export default ListMenu;