import { configureStore } from "@reduxjs/toolkit";
import VcSlice from "./vcSlice";
export const VcStore = configureStore({
    reducer: {
        app: VcSlice
    }
});
export type IVcStore = ReturnType<typeof VcStore.getState>;