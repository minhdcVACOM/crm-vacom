import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, ViewStyle, Text } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { StyleProp } from "react-native";
import { VcConstant } from "@/utils/constant";
import VcPress from "./vcPress";
import { router, useRouter } from "expo-router";
import VcMenu from "./vcMenu";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import VcExpand from "./vcExpand";

interface IProgs {
    setClicked?: (v: boolean) => void,
    onSearch?: (value: { field: string, value: string },
        filterAdd?: { field: string, value: string }[]) => void, // field * is quickSearch
    colorIcon?: string,
    backgroundColor?: string,
    textColor?: string,
    value?: string,
    style?: StyleProp<ViewStyle>,
    onBack?: () => void,
    quickSearch?: boolean;
    fieldSearch?: {
        id: string;
        value: string;
        ref?: string;
    }[];
    references?: any
}
const VcSearchBarWin = (props: IProgs) => {
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {
        setClicked, onSearch, references,
        colorIcon, backgroundColor, textColor, value, style, onBack, quickSearch, fieldSearch
    } = props;
    const [txtSearch, setTxtSearch] = useState<string>(value ?? "");
    const [field, setField] = useState<string>(quickSearch ? "*" : fieldSearch && fieldSearch[0]?.id || "");
    const [selects, setSelects] = useState<{ id: string; value: string; ref?: string }[]>([]);
    const [menu, setMenu] = useState<{ id: string; value: string }[]>([]);
    useEffect(() => {
        let _menu = [];
        let _selects = [] as { id: string; value: string; ref?: string }[];
        if (quickSearch) {
            _menu.push({ id: "*", value: "Tìm nhanh" });
            _menu.push({ id: "-", value: "" });
        }
        if (fieldSearch) {
            fieldSearch.forEach(fSearch => {
                fSearch.ref ? _selects.push(fSearch) : _menu.push(fSearch);
            });
        }
        setMenu(_menu);
        setSelects(_selects);
    }, [])
    useEffect(() => {
        // Clear timeout mỗi lần người dùng gõ
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        // Đặt timeout mới
        debounceTimeout.current = setTimeout(() => {
            // Thực hiện hành động search sau 300ms
            if (onSearch) {
                onSearch({ field: field, value: txtSearch });
            }
        }, 300);
        // Clear timeout khi component unmount
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [txtSearch]);
    return (
        <View style={[{ backgroundColor: backgroundColor || "#fff" }, style]}>
            {selects.length > 0 && <VcExpand title="Bộ lọc" textColor={VcConstant.colors.purple}>
                <Text>Bộ lọc mở rộng</Text>
            </VcExpand>
            }
            <View style={styles.searchBar}>
                <VcPress onPress={() => {
                    onBack ? onBack() : router.back();
                }}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </VcPress>
                <TextInput
                    style={[styles.input, { color: textColor || "#000" }]}
                    placeholder="Tìm kiếm"
                    value={txtSearch}
                    onChangeText={setTxtSearch}
                    onFocus={() => {
                        if (setClicked) setClicked(true);
                    }}
                />
                {txtSearch && (
                    <Entypo name="cross" size={24} color={colorIcon || VcConstant.colors.primaryDark} style={{ padding: 1 }} onPress={() => {
                        setTxtSearch("");
                        Keyboard.dismiss();
                    }} />
                )}
                {menu.length > 0 && <VcMenu
                    data={menu}
                    onSelect={menuId => setField(menuId)}
                    idCurrent={field}
                    viewMenu={
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center", padding: 5 }}>
                            <Text>{field}</Text>
                            <FontAwesome name="filter" size={15} color="blue" />
                        </View>
                    }
                />}
            </View>
        </View>
    );
};

export default VcSearchBarWin;

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: VcConstant.layout.borderColor,
        alignItems: "center",
        paddingRight: 10
    },
    input: {
        flex: 1
    },
});