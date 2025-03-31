import React from "react";
import { Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { VcConstant } from "@/utils/constant";

interface CheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    align?: "left" | "right";
    isSwitch?: boolean,
    style?: { colorIcon: { checked: string, unChecked: string }, colorText: string }
}

const VcCheckBox = ({ label, checked, onChange, align, isSwitch, style }: CheckBoxProps) => {
    const iconColor = checked ?
        (!style ? VcConstant.colors.primary : style.colorIcon.checked) :
        (!style ? "gray" : style.colorIcon.unChecked);
    const textColor = !style ? "#000" : style.colorText;
    return (
        <TouchableOpacity style={styles.container} onPress={() => onChange(!checked)}>
            {(!align || align === "left") && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
            {isSwitch ?
                <Switch
                    thumbColor={"#fff"}
                    trackColor={{ false: VcConstant.colors.gray, true: VcConstant.colors.primary }}
                    ios_backgroundColor={VcConstant.colors.gray}
                    onValueChange={onChange}
                    value={checked}
                /> :
                <MaterialIcons name={checked ? "check-box" : "check-box-outline-blank"} size={24} color={iconColor} />
            }
            {(align === "right") && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        gap: 5
    },
    label: {

    },
});

export default VcCheckBox;