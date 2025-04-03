import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import AntDesign from '@expo/vector-icons/AntDesign';
import { VcConstant } from "@/utils/constant";
import VcSparator from "./vcSeparator";

interface IMenu {
    id?: string;
    value?: string;
    icon?: ReactNode;
}
interface IProgs {
    data: IMenu[];
    onSelect: (id: string) => void;
    viewMenu?: ReactNode;
    idCurrent?: string;
}
const VcMenu = (progs: IProgs) => {
    const { data, onSelect, viewMenu, idCurrent } = progs;
    return (
        <View style={{ borderRadius: 10, overflow: "hidden", backgroundColor: VcConstant.colors.primaryLight }}>
            <Menu onSelect={value => onSelect(value)}>
                <MenuTrigger>
                    <View style={{ borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                        {viewMenu || <MaterialIcons name="more-vert" size={24} color="black" />}
                    </View>
                </MenuTrigger>
                <MenuOptions customStyles={{ optionsContainer: { borderRadius: 10, backgroundColor: VcConstant.colors.primaryLight } }}>
                    {data.map(menu => (menu.id !== "-") ?
                        <MenuOption key={menu.id} value={menu.id}>
                            <View key={menu.id} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", gap: 10, marginLeft: 10 }}>
                                    {menu.icon}
                                    <Text>{menu.value}</Text>
                                </View>
                                {idCurrent && (menu.id === idCurrent) && <AntDesign name="check" size={24} color="blue" />}
                            </View>
                        </MenuOption>
                        : <VcSparator key={menu.id} />)}
                </MenuOptions>
            </Menu>
        </View>
    );
}
export default VcMenu;