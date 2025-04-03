import { createSlice } from "@reduxjs/toolkit";
interface AppState {
    logo: string | null;
    userInfo: {
        tenant: string,
        username: string,
        token: string
    } | null;  // Nếu bạn biết rõ cấu trúc userInfo, nên thay `any` bằng interface cụ thể
    orgUnit: {
        id: string,
        code: string,
        taxCode: string,
        name: string,
        address: string,
    } | null;   // Tương tự cho orgUnit
    currentMenu: {
        title: string;
        menuId: string;
        windowId: string;
        quickSearch?: boolean;
        fieldSearch?: any[];
        marginBottom?: number;
    } | null
}
const initialState: AppState = {
    logo: null,
    userInfo: null,
    orgUnit: null,
    currentMenu: null
}
const VcSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLogo: (state, action) => {
            if (action.payload && !action.payload.startsWith("Content"))
                state.logo = action.payload;
            else
                state.logo = null;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setOrgUnit: (state, action) => {
            state.orgUnit = action.payload;
        },
        setCurrentMenu: (state, action) => {
            state.currentMenu = action.payload;
        }
    }
});
export const { setLogo, setUserInfo, setOrgUnit, setCurrentMenu } = VcSlice.actions;
export default VcSlice.reducer;