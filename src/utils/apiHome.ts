import { VcConstant } from "./constant";
import { Helper } from "./helper";
import vcAxios from "./vcAxios";

const _apiGetDashboardCode = async (code: string) => {
    const url = "/api/app/nats/request/vacom.crm.get.dashboard?code=" + encodeURIComponent(code);
    return vcAxios.get(url);
}
export const apiGetDashboardCode = async (code: string, callBack?: (res: any) => void, setLoading?: (loading: boolean) => void) => {
    return await _apiGetDashboardCode(code)
        .then(res => {
            return callBack?.(res);
        })
        .catch(error => {
            setLoading?.(false);
            Helper.toastShow(JSON.stringify(error), true);
        })
}
export const apiGetDashboardListCode = async (callBack?: (res: any) => void, setLoading?: (loading: boolean) => void) => {
    let arrGet: any[] = [];
    const listCode = ["TPL_COUNT_CUS", "TPL_COUNT_CONTRACT_IN_MONTH", "TPL_COUNT_CUS_APPOINTMENT", "TPL_COUNT_TICKET_SUPPORT"];
    listCode.forEach(code => arrGet.push(_apiGetDashboardCode(code)));
    const _getInfo = (i: number, type: "label" | "icon" | "background") => {
        let _result = "";
        switch (i) {
            case 0:
                _result = (type === "label" ? "Khách hàng" : (type === "icon" ? "groups" : VcConstant.colors.primaryDark));
                break;
            case 1:
                _result = (type === "label" ? "Hợp đồng" : (type === "icon" ? "note" : VcConstant.colors.blue));
                break;
            case 2:
                _result = (type === "label" ? "Lịch hẹn" : (type === "icon" ? "calendar-month" : VcConstant.colors.orange));
                break;
            case 3:
                _result = (type === "label" ? "Đang hỗ trợ" : (type === "icon" ? "support-agent" : VcConstant.colors.green));
                break;
        }
        return _result;
    }
    Promise.all(arrGet)
        .then((results: { total: string }[]) => {
            let res = [];
            for (let i = 0; i < listCode.length; i++) {
                res.push({
                    code: listCode[i],
                    label: _getInfo(i, "label"),
                    icon: _getInfo(i, "icon"),
                    backColor: _getInfo(i, "background"),
                    total: results[i].total
                })
            }
            return callBack?.(res);
        })
        .catch((error) => {
            setLoading?.(false);
            Helper.toastShow(JSON.stringify(error), true);
        })
}

export const apiGetDashboardListChart = async (callBack?: (res: any) => void, setLoading?: (loading: boolean) => void) => {
    let arrGet: any[] = [];
    const listCode = ["TPL_COUNT_CONTRACT_BY_TYPE", "TPL_COUNT_CONTRACT_EXPIRE"];
    listCode.forEach(code => arrGet.push(_apiGetDashboardCode(code)));
    Promise.all(arrGet)
        .then((results: any[]) => {
            let res = [
                results[0].data,
                []
            ];
            results[1].data.forEach((item: any) => {
                res[1].push({
                    color: item.color,
                    text: item.total + "",
                    value: item.total,
                    label: item.month
                })
            })
            return callBack?.(res);
        })
        .catch((error) => {
            setLoading?.(false);
            Helper.toastShow(JSON.stringify(error), true);
        })
}

