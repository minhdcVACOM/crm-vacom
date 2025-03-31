import { Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { postApi } from "@/utils/api";
import { VcApi } from "@/utils/constant";
import { VcSchema } from "@/utils/vcSchema";
import VcPress from "@/components/vcPress";
import VcTextInput from "@/components/vcTextInput";
interface IForm {
    currentPassword: string,
    newPassword: string,
    confirmPass: string
}
const ModalChangePass = ({ setModalVisible }: { setModalVisible: (modalVisible: boolean) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const onSbumit = (values: IForm) => {
        postApi({
            link: VcApi.api.setting.postChangePassword,
            data: values,
            callBack: (res) => {
                setModalVisible(false)
            },
            setLoading: setLoading
        });
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ currentPassword: "", newPassword: "", confirmPass: "" }}
                onSubmit={(onSbumit)}
                validationSchema={VcSchema.accountPass}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontWeight: "600", fontSize: 18, textAlign: "center" }}>Đổi mật khẩu</Text>
                        <VcTextInput
                            label="Mật khẩu hiện tại"
                            value={values.currentPassword}
                            onChangeText={handleChange('currentPassword')}
                            onBlur={handleBlur('currentPassword')}
                            placeholder="Nhập mật khẩu"
                            textError={errors.currentPassword && touched.currentPassword ? errors.currentPassword : ""}
                            isPassWord={true}
                        />
                        <VcTextInput
                            label="Mật khẩu mới"
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            placeholder="Nhập mật khẩu mới"
                            textError={errors.newPassword && touched.newPassword ? errors.newPassword : ""}
                            isPassWord={true}
                        />
                        <VcTextInput
                            label="Xác nhận mật khẩu"
                            value={values.confirmPass}
                            onChangeText={handleChange('confirmPass')}
                            onBlur={handleBlur('confirmPass')}
                            placeholder="Xác nhận mật khẩu"
                            textError={errors.confirmPass && touched.confirmPass ? errors.confirmPass : ""}
                            isPassWord={true}
                        />
                        <VcPress skin='primary' title={"Ghi lại"}
                            style={{ marginTop: 10, alignSelf: "flex-end" }}
                            pressStyle={
                                { padding: 5, borderWidth: 0, width: 100 }
                            }
                            onPress={handleSubmit}
                            loading={loading}
                        />
                    </View>
                )}
            </Formik>
        </>
    );
}
export default ModalChangePass;