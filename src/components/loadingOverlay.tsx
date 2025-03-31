import { VcConstant } from "@/utils/constant";
import { View, StyleSheet, ActivityIndicator, ViewStyle, StyleProp, Text } from "react-native";

interface IProps {
    style?: StyleProp<ViewStyle>;
    color?: string;
    animating?: boolean;
    title?: string;
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        zIndex: 99,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0,0.2)"
    }
})
const LoadingOverlay = (props: IProps) => {
    return (
        <View style={[styles.loading, props.style]}>
            <ActivityIndicator size='large' color={props.color ?? VcConstant.colors.primary} animating={props.animating} />
            {props.title && props.animating && <Text>{props.title}</Text>}
        </View>
    )
}

export default LoadingOverlay;
