
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useState } from "react"
import { ActivityIndicator, Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import VcPress from "@/components/vcPress";
import { VcApi, VcConstant } from "@/utils/constant";
import { setLogo } from "@/redux/vcSlice";
import { usePopup } from "@/components/dialog/popupProvider";
import { Helper } from "@/utils/helper";
import { postApi } from "@/utils/api";


const FormData = global.FormData;
interface IProgs {
    setModalVisible: (modalVisible: boolean) => void
}
const ModalCamera = (progs: IProgs) => {
    const { setModalVisible } = progs
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { showPopup } = usePopup();
    const buttonClick = async (type: "camera" | "folder" | "delete") => {
        try {
            let result;
            switch (type) {
                case "camera":
                    await ImagePicker.requestCameraPermissionsAsync();
                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    });
                    break;
                case "folder":
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ["images"],
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    });
                    break;
                case "delete":
                    showPopup({
                        message: "Bạn có muốn xóa logo không?",
                        iconType: "question",
                        onConfirm: deleteImage,
                        showCancel: true
                    });
                    break;
                default:
                    break;
            }
            if (result && !result.canceled) {
                // console.log("result>>", result);
                await updateImage(result.assets[0].uri, result.assets[0].mimeType!, result.assets[0].fileName!, () => {
                    setModalVisible(false);
                });
            }
        } catch (error: any) {
            Helper.toastShow("Error update image", error.message)
        }
    }
    const updateImage = (image: string, mimeType: string, fileName: string, calBack?: () => void) => {

        const formData = new FormData();
        // @ts-ignore:next-line
        formData.append("upload", {
            uri: image,
            type: mimeType,
            name: fileName
        });
        formData.append("upload_fullpath", fileName);
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            },
            transformRequest: () => {
                return formData;
            }
        };
        postApi({
            link: VcApi.api.setting.postUploadLogo,
            data: formData,
            config: config,
            callBack: (res) => {
                if (res.error) {
                    showPopup({
                        message: "Kích thước ảnh có thể quá lớn, hãy thu nhỏ lại nhé!",
                        iconType: "info"
                    });
                    return;
                } else {
                    dispatch(setLogo(image));
                    if (calBack) calBack();
                }
            },
            setLoading: setLoading
        });
    }
    const deleteImage = () => {
        postApi({
            link: VcApi.api.setting.postDeleteLogo,
            callBack: (res) => dispatch(setLogo(null)),
            setLoading: setLoading
        })
    }
    return (
        <View>
            {loading ? <ActivityIndicator size={"large"} color={VcConstant.colors.primary} /> : <Text style={{ fontWeight: "600", fontSize: 20, textAlign: "center", marginBottom: 10 }}>Hình ảnh</Text>}
            <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center" }}>
                <VcPress onPress={() => buttonClick("camera")}>
                    <AntDesign name="camera" size={30} color={VcConstant.colors.blue} />
                </VcPress>
                <VcPress onPress={() => buttonClick("folder")}>
                    <Entypo name="folder" size={30} color={VcConstant.colors.orange} />
                </VcPress>
                <VcPress onPress={() => buttonClick("delete")}>
                    <Entypo name="trash" size={30} color={VcConstant.colors.primary} />
                </VcPress>
            </View>
        </View>
    );
}
export default ModalCamera;