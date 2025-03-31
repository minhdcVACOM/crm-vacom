import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import VcPress from '@/components/vcPress';
import { VcText } from '@/components/vcText';
import VcCard from '@/components/vcCard';
import VcLink from '@/components/vcLink';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import VcTextInput from '@/components/vcTextInput';
import { VcConstant } from '@/utils/constant';
import VcCheckBox from '@/components/vcCheckBox';
import { apiLogin } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/vcSlice';
import { Formik } from 'formik';
import { VcSchema } from '@/utils/vcSchema';
import { usePopup } from '@/components/dialog/popupProvider';
import LoadingOverlay from '@/components/loadingOverlay';
import { loginHelper } from '@/utils/hooks/loginHelper';
interface IForm {
    tenant: string,
    username: string,
    password: string,
    remember: boolean
}
export default function LoginScreen() {
    // const userInfo = useSelector((state: IVcStore) => state.app.userInfo);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [linkApi, setLinkApi] = useState<string>("");
    const [initialValues, setInitialValues] = useState<IForm>({ tenant: "", username: "", password: "", remember: false });
    const { getInfoLogin, saveInfoLogin, getLinkApi, saveLinkApi } = loginHelper();
    useEffect(() => {
        getInfoLogin((res: ILogin) => {
            if (res && JSON.stringify(res) !== JSON.stringify(initialValues)) {
                setInitialValues(res);
            }
        });
        getLinkApi((urlBase: string) => setLinkApi(urlBase));
    }, []);

    const { showPopup } = usePopup();
    const handleChangeLinkApi = useCallback((text: string) => {
        if (text !== linkApi) {
            setLinkApi(text);
            saveLinkApi(text);
        }
    }, [linkApi]);
    const editLinkApi = () => {
        showPopup({
            // title: 'Cài đặt',
            inputLabel: 'Đường link',
            iconType: "question", //'success' | 'warning' | 'error' | 'info' | 'question' | 'none';
            showInput: true,
            inputDefaultValue: linkApi,
            onConfirm: handleChangeLinkApi
        });
    }
    const login = (values: IForm) => {
        apiLogin({
            ...values,
            setLoading: setLoading,
            callBack: (res: ILogin) => {
                if (res) dispatch(setUserInfo({ tenant: res.tenant, username: res.username, token: res.token }));
                saveInfoLogin(res);
                router.navigate("/listOrgUnit");
            }
        })
    }
    return (
        <>
            <View style={styles.bgStyle} />
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <VcText type='headerLarge' style={{ color: "#fff", fontSize: 50 }} text='VACOM' />
                        <VcText type='subHeader' style={[{ color: "#fff" }]} text='crm' />
                    </View>
                </View>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={login}
                    validationSchema={VcSchema.login}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                        <>
                            <VcCard style={{ borderRadius: 20, borderColor: VcConstant.colors.primary, borderWidth: 5, gap: 10 }} >
                                <VcText type='header' style={{ color: VcConstant.colors.primary, textAlign: "center" }} text='Đăng nhập' />
                                <VcLink title={linkApi} textStyle={{ color: VcConstant.colors.purple }}
                                    onPress={editLinkApi}
                                />
                                <VcTextInput
                                    label='Mã truy cập'
                                    placeholder="Mã truy cập"
                                    onBlur={handleBlur('tenant')}
                                    value={values.tenant}
                                    onChangeText={handleChange('tenant')}
                                    textError={errors.tenant}
                                    icon={(color) => <FontAwesome5 name="qrcode" size={20} color={color} />}
                                    autoCapitalize='characters'
                                />
                                <VcTextInput
                                    label='Tên truy cập'
                                    placeholder="Tên truy cập"
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    textError={errors.username}
                                    icon={(color) => <FontAwesome5 name="user-tie" size={20} color={color} />}
                                    autoCapitalize='characters'
                                />
                                <VcTextInput
                                    label="Mật khẩu"
                                    placeholder="Mật khẩu"
                                    isPassWord={true}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    textError={errors.password}
                                    icon={(color) => <FontAwesome5 name="lock" size={20} color={color} />}
                                />
                            </VcCard>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <VcCheckBox label='Nhớ mật khẩu'
                                    checked={values.remember}
                                    onChange={(checked) => setFieldValue("remember", checked)}
                                    isSwitch={true}
                                />
                                <VcLink title='Quên mật khẩu ?' textStyle={{ color: VcConstant.colors.primary }}
                                    onPress={() => router.navigate({
                                        pathname: "/forgotPass",
                                        params: { tenant: values.tenant }
                                    })}
                                />
                            </View>
                            <VcPress title='Đăng nhập' skin='primary' onPress={handleSubmit} loading={loading} />
                        </>
                    )}
                </Formik>
            </View>
            {loading && <LoadingOverlay animating={false} />}
        </>
    );
}

const styles = StyleSheet.create({
    bgStyle: {
        position: 'absolute',
        height: "75%",
        width: "100%",
        backgroundColor: VcConstant.colors.primary,
        top: 0,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    txtNameApp: {
        color: '#E53935',
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    }
});
