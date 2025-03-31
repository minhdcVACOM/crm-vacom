import { useEffect, useState } from "react";
import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import { getApi, postApi } from "@/utils/api";
import { VcApi } from "@/utils/constant";
import { VcSchema } from "@/utils/vcSchema";
import VcPress from "@/components/vcPress";
import VcTextInput from "@/components/vcTextInput";
interface IForm {
    name: string,
    email: string
}
const ModalChangeName = ({ setModalVisible }: { setModalVisible: (modalVisible: boolean) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IForm>({ name: "", email: "" });
    useEffect(() => {
        getApi({
            link: VcApi.api.setting.getCurrentInfo,
            callBack: (res) => setData(res)
        });
    }, [])
    const onSbumit = (values: IForm) => {
        postApi({
            link: VcApi.api.setting.postSaveCurrentInfo,
            data: values,
            callBack: (res) => setModalVisible(false),
            setLoading: setLoading
        })
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={data}
                onSubmit={(onSbumit)}
                validationSchema={VcSchema.accountName}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontWeight: "600", fontSize: 18, textAlign: "center" }}>Sửa tên</Text>
                        <VcTextInput
                            label="Tên truy cập"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            placeholder="Nhập tên truy cập"
                            textError={errors.name}
                        />
                        <VcTextInput
                            label="Email"
                            value={values.email}
                            disable={true}
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
export default ModalChangeName;