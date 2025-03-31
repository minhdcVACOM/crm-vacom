import { VcConstant } from "@/utils/constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { KeyboardTypeOptions } from "react-native";
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
interface IProgs {
    label?: string;
    disable?: boolean;
    textError?: string;
    multiline?: boolean;
    value?: string;
    onBlur?: (e: any) => void;
    onChangeText?: (text: string) => void;
    icon?: (color: string) => ReactNode;
    placeholder?: string;
    isPassWord?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    style?: StyleProp<ViewStyle>
}
const VcTextInput = ({
    value, onBlur, onChangeText, icon, placeholder,
    isPassWord, keyboardType, autoCapitalize, label, disable, textError, multiline, style
}: IProgs) => {
    const [isFocus, setIsFocus] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const heightStyle = multiline ? { height: 80, textAlignVertical: "top" } : null;
    const color = disable ? VcConstant.colors.gray : (isFocus ? VcConstant.colors.primary : VcConstant.colors.gray);
    return (
        <View style={[styles.container, { borderColor: color, backgroundColor: disable ? VcConstant.colors.grayLight : "#fff" }, style]}>
            {icon && icon(color)}
            {label && <Text style={[styles.label, { backgroundColor: color, borderColor: color }]}>
                {label}
                {textError && <Text style={[styles.txtError]}> {" > " + textError}</Text>}
            </Text>}
            <TextInput
                style={[styles.input, heightStyle] as any}
                placeholder={placeholder}
                secureTextEntry={isPassWord && !showPass}
                editable={!disable}
                onFocus={() => setIsFocus(true)}
                onBlur={(e) => {
                    setIsFocus(false);
                    if (onBlur) onBlur(e);
                }}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {isPassWord &&
                <FontAwesome5
                    name={showPass ? "eye" : "eye-slash"} size={20}
                    color={color}
                    onPress={() => setShowPass(!showPass)}
                />
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: VcConstant.layout.borderRadius,
        borderWidth: VcConstant.layout.borderWidth,
        marginVertical: VcConstant.layout.marginVertical,
        paddingHorizontal: 10,
        paddingTop: 5,
        gap: 10
    },
    input: {
        flex: 1,
        height: 40
    },
    label: {
        position: "absolute",
        top: -15,
        left: 10,
        color: "#fff",
        // backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 20,
        borderWidth: VcConstant.layout.borderWidth,
    },
    txtError: {
        fontSize: 10,
        color: "#fff"
    }
})

export default VcTextInput;