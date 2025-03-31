import { VcConstant } from "utils/constant";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
interface IProps {
    children: any;
    style?: StyleProp<ViewStyle>
}
const VcCard = ({ children, style }: IProps) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: VcConstant.layout.borderWidth,
        borderColor: '#ddd',
        borderRadius: VcConstant.layout.borderRadius,
        marginVertical: VcConstant.layout.marginVertical,
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: VcConstant.layout.padding,
    }
});
export default VcCard;