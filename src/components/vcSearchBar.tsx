import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, ViewStyle } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { StyleProp } from "react-native";
import { VcConstant } from "@/utils/constant";
import VcPress from "./vcPress";
import { router, useRouter } from "expo-router";

interface IProgs {
    setClicked?: (v: boolean) => void,
    onSearch?: (v: string) => void,
    colorIcon?: string,
    backgroundColor?: string,
    textColor?: string,
    value?: string,
    style?: StyleProp<ViewStyle>,
    onBack?: () => void
}
const VcSearchBar = (props: IProgs) => {
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {
        setClicked, onSearch,
        colorIcon, backgroundColor, textColor, value, style, onBack
    } = props;
    const [txtSearch, setTxtSearch] = useState<string>(value ?? "");

    useEffect(() => {
        // Clear timeout mỗi lần người dùng gõ
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        // Đặt timeout mới
        debounceTimeout.current = setTimeout(() => {
            // Thực hiện hành động search sau 300ms
            if (onSearch) {
                onSearch(txtSearch);
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
        <View style={[styles.searchBar, { backgroundColor: backgroundColor || "#fff" }, style]}>
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
        </View>
    );
};

export default VcSearchBar;

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