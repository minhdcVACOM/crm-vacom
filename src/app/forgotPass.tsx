import OTPTextView from 'react-native-otp-textinput';
import { Text, View } from "react-native";
import { Helper } from "@/utils/helper";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Formik } from 'formik';
import VcBackButton from "@/components/vcBackButton";
import { VcSchema } from "@/utils/vcSchema";
import { postApi } from '@/utils/api';
import { VcApi, VcConstant } from '@/utils/constant';
import { usePopup } from '@/components/dialog/popupProvider';
import VcHeader from '@/components/vcHeader';
import VcCard from '@/components/vcCard';
import VcTextInput from '@/components/vcTextInput';
import VcPress from '@/components/vcPress';
import LoadingOverlay from '@/components/loadingOverlay';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { VcText } from '@/components/vcText';

interface IParams {
    tenant?: string
}
interface IForm {
    tenant: string,
    email: string,
    otp: string,
}
const ForgotPass = () => {
    const params: IParams = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [typeSubmit, setTypeSubmit] = useState<number>(0);
    const { showPopup } = usePopup();
    const FormSubmit = useCallback((values: IForm) => {
        if (typeSubmit === 0) {
            recoverPass(values.tenant, values.email, values.otp);
        } else {
            sendOtp(values.tenant, values.email);
        }
    }, [typeSubmit])

    const sendOtp = useCallback((tenant: string, email: string) => {
        postApi({
            link: VcApi.api.login.postSendOtp,
            data: {
                tenantName: tenant,
                email: email
            },
            callBack: (res) => Helper.toastShow(res.msg),
            setLoading: setLoading
        });
    }, [])
    const recoverPass = useCallback((tenant: string, email: string, otp: string) => {
        if (!otp || otp.length < 6) {
            showPopup(
                {
                    message: 'Bạn chưa nhập đủ mã OTP',
                    iconType: 'warning'
                }
            );
            return;
        }
        postApi({
            link: VcApi.api.login.postRecoverPass,
            data: {
                tenant: tenant,
                email: email,
                otpCode: otp
            },
            callBack: (res) => Helper.toastShow(res.msg),
            setLoading: setLoading
        });
    }, [])
    return (
        <>
            <View style={{ alignItems: 'center', backgroundColor: "#fff" }}>
                <VcBackButton />
                <VcHeader title="Quên mật khẩu" />
            </View>
            <Formik
                initialValues={{ tenant: params.tenant!, email: '', otp: '' }}
                onSubmit={FormSubmit}
                validationSchema={VcSchema.forgotPass}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ marginHorizontal: 10 }}>
                        <VcCard style={{ gap: 10, padding: 20 }}>
                            <VcTextInput
                                label="Mã truy cập"
                                value={values.tenant}
                                onChangeText={handleChange('tenant')}
                                onBlur={handleBlur('tenant')}
                                placeholder="Nhập mã truy cập"
                                autoCapitalize="characters"
                                textError={errors.tenant}
                                icon={(color) => <FontAwesome5 name="qrcode" size={20} color={color} />}
                            />
                            <VcTextInput
                                label="Hòm thư"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder="Nhập địa chỉ hòm thư"
                                keyboardType="email-address"
                                textError={errors.email}
                                icon={(color) => <MaterialIcons name="email" size={20} color={color} />}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Text>Nhập mã OTP</Text>
                                <VcPress
                                    onPress={() => {
                                        setTypeSubmit(1);
                                        handleSubmit();
                                    }}
                                >
                                    <VcText text='(Lấy mã OTP)' style={{ color: "blue", fontWeight: "bold", textDecorationLine: "underline" }} />
                                </VcPress>
                            </View>
                            <OTPTextView
                                defaultValue={values.otp}
                                handleTextChange={handleChange('otp')}
                                // ref={inputOtp}
                                textInputStyle={{
                                    borderColor: VcConstant.colors.primaryDark,
                                    backgroundColor: "#fff",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderBottomWidth: 1,
                                    // @ts-ignore:next-line
                                    color: VcConstant.colors.primaryDark
                                }}
                                inputCount={6}
                                tintColor={VcConstant.colors.primaryDark}
                            />
                            <VcPress title="Lấy lại mật khẩu"
                                skin='primary'
                                style={{ width: 200, alignSelf: "center" }}
                                onPress={() => {
                                    setTypeSubmit(0);
                                    handleSubmit();
                                }} loading={loading && !typeSubmit}
                            />
                        </VcCard>
                    </View >
                )}
            </Formik>
            {loading && <LoadingOverlay animating={loading && !typeSubmit ? false : true} />}
        </>
    );
}
export default ForgotPass;