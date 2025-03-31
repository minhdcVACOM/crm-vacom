import AsyncStorage from "@react-native-async-storage/async-storage";
import { VcApi } from "../constant";
export const loginHelper = () => {
    const getInfoLogin = async (callBack: (res: any) => void) => {
        try {
            const sInfoLogin = await AsyncStorage.getItem(VcApi.keyStorage.infoLogin);
            const infoLogin = sInfoLogin ? JSON.parse(sInfoLogin) : null;
            callBack(infoLogin);
        } catch (error) {
            callBack(null);
        }
    }
    const saveInfoLogin = async (login: ILogin) => {
        const { tenantId, tenant, username, password, token, remember } = login;
        if (remember) {
            await AsyncStorage.setItem(VcApi.keyStorage.infoLogin, JSON.stringify({
                tenant: tenant, username: username, password: password, remember: remember
            }))
        } else {
            await AsyncStorage.removeItem(VcApi.keyStorage.infoLogin);
        }
        await AsyncStorage.setItem(VcApi.keyStorage.token, token);
        await AsyncStorage.setItem(VcApi.keyStorage.tenant, tenantId);
    }
    const getTenant = async () => {
        try {
            return await AsyncStorage.getItem(VcApi.keyStorage.tenant);
        } catch (error) {
            return null;
        }
    }
    const getToken = async () => {
        try {
            return await AsyncStorage.getItem(VcApi.keyStorage.token);
        } catch (error) {
            return null;
        }
    }
    const getLinkApi = async (callBack?: (res: any) => void) => {
        try {
            const apiLink = await AsyncStorage.getItem(VcApi.keyStorage.urlBase);
            if (callBack) callBack(apiLink ?? VcApi.urlBase);
            return apiLink ?? VcApi.urlBase;
        } catch (error) {
            if (callBack) callBack(null);
            return null;
        }
    }
    const saveLinkApi = async (linkApi: string) => {
        await AsyncStorage.setItem(VcApi.keyStorage.urlBase, linkApi);
    }

    const saveOrgCode = async (orgCode: string) => {
        await AsyncStorage.setItem(VcApi.keyStorage.orgCode, orgCode);
    }
    const getOrdCode = async () => {
        try {
            return await AsyncStorage.getItem(VcApi.keyStorage.orgCode);
        } catch (error) {
            return null;
        }
    }
    return { getInfoLogin, saveInfoLogin, getTenant, getToken, getLinkApi, saveLinkApi, saveOrgCode, getOrdCode };
}