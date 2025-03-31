import { StyleProp, TextStyle } from "react-native";
import { Pressable } from "react-native";
import { VcText } from "./vcText";
interface IProps {
    title: string;
    onPress?: () => void;
    textStyle?: StyleProp<TextStyle>;
}

const VcLink = ({ title, onPress, textStyle }: IProps) => {
    return (
        <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, padding: 10 }]}
            onPress={onPress}>
            <VcText style={[{ textDecorationLine: "underline", fontWeight: "bold", textAlign: "center" }, textStyle]} text={title} />
        </Pressable>
    );
}
export default VcLink;