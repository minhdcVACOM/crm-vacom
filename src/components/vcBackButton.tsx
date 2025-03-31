import { router } from "expo-router";
import VcPress from "./vcPress";
import AntDesign from '@expo/vector-icons/AntDesign';

const VcBackButton = () => {
    return (
        <VcPress style={{ position: "absolute", top: 10, left: 10, width: 50 }}
            onPress={() => router.back()}
        >
            <AntDesign name="arrowleft" size={24} color="black" />
        </VcPress>
    );
}
export default VcBackButton;