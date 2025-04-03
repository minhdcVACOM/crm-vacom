import { showToast } from "@/components/dialog/vcToast";
import { VcConstant } from "./constant";
const ERROR_MESSAGES = {
    UNKNOWN: "Đã xảy ra lỗi không xác định",
    NETWORK: "Lỗi kết nối mạng",
    SERVER: "Lỗi máy chủ",
    TIMEOUT: "Yêu cầu hết thời gian"
} as const;
export const Helper = {
    getError: (error: any) => {
        if (!error) {
            return { message: ERROR_MESSAGES.UNKNOWN };
        }

        if (error.response?.data?.error) {
            return error.response.data.error;
        }

        if (error.response?.data) {
            return error.response.data;
        }

        if (error.message) {
            return { message: error.message };
        }

        return { message: ERROR_MESSAGES.UNKNOWN };
    },
    toastShow: (msg: string, error?: boolean, backgroundColor?: string) => {
        if (!msg) return;
        showToast(msg.trim(), {
            backgroundColor: backgroundColor ? backgroundColor : (error ? VcConstant.colors.warning : VcConstant.colors.success)
        });
    },
    showError: (error: IError) => {
        if (!error) return;

        let messages: string[] = [];

        if (error.validationErrors?.length) {
            messages = error.validationErrors.map(e => e.message);
        } else if (error.message) {
            messages = [error.message];
        }

        const finalMessage = messages.join("\n").trim();
        if (finalMessage) {
            Helper.toastShow(finalMessage, true);
        }
    },
    dateToString(date: Date | null, format?: "dd/MM/yyyy" | "dd-MM-yyyy" | "yyyy-MM-dd") {
        if (!date) return null;
        var d = date.getDate();
        var m = date.getMonth() + 1; //January is 0!
        var sDate, dd = d + "", mm = m + "";
        var yyyy = date.getFullYear();
        if (d < 10) {
            dd = '0' + d;
        }
        if (m < 10) {
            mm = '0' + m;
        }
        switch (format) {
            case "dd/MM/yyyy":
                sDate = dd + "/" + mm + "/" + yyyy;
                break;
            case "yyyy-MM-dd":
                sDate = yyyy + "-" + mm + "-" + dd;
                break;
            case "dd-MM-yyyy":
                sDate = dd + "-" + mm + "-" + yyyy;
                break;
            default:
                sDate = dd + "/" + mm + "/" + yyyy;
                break;
        }
        return sDate;
    },
    formatDate(strDate: string, format?: "dd/MM/yyyy" | "dd-MM-yyyy" | "yyyy-MM-dd") {
        if (!strDate) return null;
        var strSplitDate = String(strDate).split(' ');
        var date: any = new Date(strSplitDate[0]);
        const pad = (num: number) => num.toString().padStart(2, "0"); // Đảm bảo luôn có 2 chữ số
        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1); // Tháng trong JS bắt đầu từ 0
        const year = date.getFullYear().toString();
        switch (format) {
            case "dd/MM/yyyy":
                return `${day}/${month}/${year}`;
            case "dd-MM-yyyy":
                return `${day}-${month}-${year}`;
            case "yyyy-MM-dd":
                return `${year}-${month}-${day}`;
            default:
                return null;
        }
    },
    formatNumber(input: any, decimalSeparator = ".", thousandSeparator = " ", decimalPlaces = 2) {
        if (typeof input === "number") {
            if (input === 0) return null;
            input = input.toString();
        }
        // Loại bỏ tất cả ký tự không hợp lệ trừ số và dấu thập phân `.`
        let rawValue = input.replace(/[^0-9.]/g, "");

        // Đảm bảo chỉ có 1 dấu `.`
        const countDecimals = (rawValue.match(/\./g) || []).length;
        if (countDecimals > 1) {
            rawValue = rawValue.replace(/\.(?=.*\.)/g, ""); // Giữ lại dấu `.` đầu tiên
        }

        const isEnd = rawValue.slice(-1) === "." && rawValue.slice(-2) !== ".";
        // Chia phần nguyên và phần thập phân
        let parts = rawValue.split(decimalSeparator);
        let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
        let decimalPart = parts[1] ? parts[1].substring(0, decimalPlaces) : "";
        return decimalPart ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart + (isEnd ? "." : "");
    },
    currencyFormatter(
        value: any,
        options?: {
            significantDigits: number,
            thousandsSeparator: string,
            decimalSeparator: string,
            symbol: string
        }) {
        const optionsInfo = (options ?? {
            significantDigits: 0,
            thousandsSeparator: '.',
            decimalSeparator: ',',
            symbol: 'đ'
        });
        if (typeof value !== 'number' || value === null) return `?${optionsInfo.symbol}`;
        value = value.toFixed(optionsInfo.significantDigits)

        const [currency, decimal] = value.split('.')
        return `${currency.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            optionsInfo.thousandsSeparator
        )}${optionsInfo.symbol}`
    }
};
