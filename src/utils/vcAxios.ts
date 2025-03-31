import axios from "axios";
import { Helper } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VcApi } from "./constant";
import { loginHelper } from "./hooks/loginHelper";

const { getTenant, getToken, getLinkApi, getOrdCode } = loginHelper();
/*
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
        const baseApi = await AsyncStorage.getItem(VcApi.keyStorage.urlBase);
        return baseApi ?? VcApi.urlBase;
    } catch (error) {
        if (callBack) callBack(null);
        return null;
    }
}
const getOrdCode = async () => {
    try {
        return await AsyncStorage.getItem(VcApi.keyStorage.orgCode);
    } catch (error) {
        return null;
    }
}
*/
const vcAxios = axios.create(
    {
        validateStatus: () => true // chấp nhận các cuộc gọi đến HTTP://
    }
);
// Add a request interceptor
vcAxios.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const baseURL = await getLinkApi();
    if (baseURL) config.baseURL = baseURL;
    const token = await getToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept-language"] = "vi";
    const orgCode = await getOrdCode();
    if (orgCode) config.headers["X-Orgcode"] = orgCode;
    const tenantId = await getTenant();
    if (tenantId) config.headers["__tenant"] = tenantId;
    // Keyboard.dismiss();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
vcAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data || response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let _error = Helper.getError(error);
    if (_error) _error = { error: _error };
    return _error || Promise.reject(error);
});
export default vcAxios;