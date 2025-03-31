import { VcApi } from "./constant";
import { Helper } from "./helper";
import vcAxios from "./vcAxios";
interface IParams {
    link: string;
    data?: any;
    callBack?: (res: any) => void;
    callError?: (error: any) => void;
    setLoading?: (loading: boolean) => void;
    config?: any
}
export const getApi = async (params: IParams) => {
    const { link, callBack, setLoading, config, callError } = params;
    setLoading?.(true);
    return await vcAxios.get(link, config)
        .then((res: any) => {
            if (res.error) {
                Helper.showError(res.error);
                callError?.(res)
                return;
            }
            callBack?.(res)
        })
        .catch(error => {
            callError?.(error)
            Helper.toastShow(JSON.stringify(error), true);
        })
        .finally(() => setLoading?.(false));
}
export const postApi = async (params: IParams) => {
    const { link, data, callBack, setLoading, config, callError } = params;
    setLoading?.(true);
    return await vcAxios.post(link, data, config)
        .then((res: any) => {
            if (res.error) {
                Helper.showError(res.error);
                callError?.(res)
                return;
            }
            callBack?.(res)
        })
        .catch(error => {
            console.log("1. chạy lỗi ở đây >>");
            callError?.(error)
            Helper.toastShow(JSON.stringify(error), true);
        })
        .finally(() => setLoading?.(false));
}
export const putApi = async (params: IParams) => {
    const { link, data, callBack, setLoading, config, callError } = params;
    setLoading?.(true);
    return await vcAxios.put(link, data, config)
        .then((res: any) => {
            if (res.error) {
                Helper.showError(res.error);
                callError?.(res)
                return;
            }
            callBack?.(res)
        })
        .catch(error => {
            callError?.(error)
            Helper.toastShow(JSON.stringify(error), true);
        })
        .finally(() => setLoading?.(false));
}
export const deleteApi = async (params: IParams) => {
    const { link, callBack, setLoading, config, callError } = params;
    setLoading?.(true);
    return await vcAxios.delete(link, config)
        .then((res: any) => {
            if (res.error) {
                Helper.showError(res.error);
                callError?.(res)
                return;
            }
            callBack?.(res)
        })
        .catch(error => {
            callError?.(error)
            Helper.toastShow(JSON.stringify(error), true);
        })
        .finally(() => setLoading?.(false));
}
interface IDataLogin {
    tenant: string,
    username: string,
    password: string,
    remember: boolean,
    callBack: (res: any) => void,
    setLoading: (loading: boolean) => void,
}
export const apiLogin = (params: IDataLogin) => {
    const { tenant, username, password, remember, callBack, setLoading } = params;
    setLoading(true);
    getApi({
        link: `${VcApi.api.login.getTenantByName}${tenant}`,
        callBack: (res: ITenant) => {
            if (!res.success) {
                Helper.toastShow(`Không tìm thấy mã truy cập [${tenant}]`, true);
                setLoading(false);
                return;
            }
            const tenantId = res.tenantId;
            const data = {
                username: username,
                password: password,
                client_id: "Accounting_App",
                scope: "Accounting",
                grant_type: "password"
            }
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "__tenant": tenantId
                }
            }
            postApi({
                link: VcApi.api.login.postToken,
                data: data,
                config: config,
                callBack: (res) => {
                    setLoading(false);
                    const login: ILogin = {
                        tenantId: tenantId,
                        tenant: tenant,
                        username: username,
                        password: password,
                        token: res.access_token,
                        tokenType: res.token_type,
                        remember: remember
                    };
                    // const { saveInfoLogin } = loginHelper();
                    // saveInfoLogin(login);
                    return callBack?.(login);
                },
                callError: (error) => {
                    setLoading(false)
                    if (error.error) {
                        Helper.toastShow("Sai tên truy cập hoặc mật khẩu!", true);
                        return;
                    }
                }
            })
        },
        callError: (error) => {
            setLoading(false);
        }
    })
}