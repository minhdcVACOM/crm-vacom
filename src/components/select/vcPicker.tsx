import React, { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import VcSearchBar from "@/components/vcSearchBar";
import {
    View, Text, Modal, TextInput, FlatList, ActivityIndicator,
    StyleSheet,
    ViewStyle,
    Pressable
} from "react-native";
import { StyleProp } from "react-native"
import { VcConstant } from "@/utils/constant";
import VcPress from "../vcPress";
import VcSparator from "../vcSeparator";

interface IProg {
    label?: string,
    apiUrl: string,
    fValue?: string,
    fDisplay?: string,
    fShow?: string,
    value?: any,
    onSelect?: (v: any | null) => void,
    containerStyle?: StyleProp<ViewStyle>,
    placeholder?: string,
    isColorItem?: boolean
}
const VcPicker = (progs: IProg) => {
    const { label, apiUrl, fValue, fDisplay, fShow, value, onSelect, containerStyle, placeholder, isColorItem } = progs;
    const config = { id: fValue ?? "id", value: fDisplay ?? "value", show: fShow ?? "value" };
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [texFilter, setTextFilter] = useState("");
    useEffect(() => {
        fetchData();
    }, []);

    // Gọi API lấy dữ liệu
    const fetchData = async () => {

    };

    // Xử lý tìm kiếm
    const handleSearch = (text: string) => {
        setTextFilter(text);
        const filtered = data.filter((item: any) =>
            item[config.value].toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // Chọn item và đóng modal
    const handleSelect = (item: any) => {
        setSelectedItem(item);
        if (onSelect) onSelect(item ? item[config.id] : "");
        setModalVisible(false);
    };
    const color = VcConstant.colors.gray;
    const addContentStyle = isColorItem ? {
        backgroundColor: selectedItem ? selectedItem.bgColor : "#fff",
        borderRadius: 20
    } : {};
    const txtStyle = isColorItem && selectedItem ? {
        color: selectedItem.txtColor
    } : {};
    return (
        <>
            {/* Nút mở Picker */}
            <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                onPress={() => setModalVisible(true)}
            >
                <View style={[styles.container, containerStyle]}>
                    {label && <Text style={[styles.title, { backgroundColor: color }]}>{label}</Text>}
                    <View style={[styles.content, { borderColor: color }, addContentStyle]}>
                        <Text style={txtStyle}>{selectedItem ? selectedItem[config.show] : <Text style={{ color: VcConstant.colors.grayLight }}>{placeholder ?? "Chọn một mục..."}</Text>}</Text>
                        {selectedItem ? <AntDesign name="close" size={20} color={isColorItem ? selectedItem.txtColor : VcConstant.colors.orange} onPress={() => handleSelect(null)} /> : <AntDesign name="down" size={20} color={color} />}
                    </View>
                </View>
            </Pressable>
            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={[styles.modal, { borderColor: color }]}>
                    {/* Ô tìm kiếm */}
                    <VcSearchBar
                        onSearch={handleSearch}
                        value={texFilter}
                        colorIcon={color}
                    />
                    {/* Danh sách lựa chọn */}
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator size="large" color={VcConstant.colors.purple} />
                        </View>
                    ) : (
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item: any) => item[config.id]}
                            renderItem={({ item }) => {

                                const style = isColorItem ? {
                                    flex: 1,
                                    color: item.txtColor
                                } : { flex: 1 };
                                const pressStyle = isColorItem ? { backgroundColor: item.bgColor, marginVertical: 10 } : {}
                                return (
                                    <VcPress
                                        onPress={() => handleSelect(item)}
                                        pressStyle={pressStyle}
                                    >
                                        <Text style={style}>{item[config.value]}</Text>
                                    </VcPress>
                                )
                            }}
                            ItemSeparatorComponent={() => <VcSparator />}
                        />
                    )}
                    {/* Nút đóng */}
                    <VcPress onPress={() => setModalVisible(false)}>
                        <AntDesign name="close"
                            size={24} color={VcConstant.colors.orange} />
                    </VcPress>
                </View>
            </Modal>
        </>
    );
};
const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        position: "relative",
        top: 10,
        zIndex: 1,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        color: "#fff"
    },
    container: {

    },
    content: {
        borderRadius: 6,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0.5,
        backgroundColor: "#fff",
    },
    modal: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
    }
})
export default VcPicker;
