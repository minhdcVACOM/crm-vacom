import React, { useState } from "react";
import { ActivityIndicator, Platform, PermissionsAndroid } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer"; // Chuyển đổi binary -> base64
import VcPress from "./vcPress";
import * as Sharing from 'expo-sharing';
import axios from "axios";
import Foundation from '@expo/vector-icons/Foundation';
import { loginHelper } from "@/utils/hooks/loginHelper";
import { VcConstant } from "@/utils/constant";
import { router } from "expo-router";
import { Helper } from "@/utils/helper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IProg {
    link: string;
    type?: "download" | "print" | "report";
    dataPost?: { data: any, headers: any },
    openWithShare?: boolean
}
const VcBtnDownloadPdf = ({ link, type = "download", dataPost, openWithShare }: IProg) => {
    const { getLinkApi, getToken, getTenant, getOrdCode } = loginHelper();
    const [loading, setLoading] = useState(false);
    // Hàm yêu cầu quyền lưu file (Android 9 trở xuống)
    const requestStoragePermission = async () => {
        if (Platform.OS === "android" && Platform.Version < 29) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Helper.toastShow("Cần cấp quyền lưu file để tiếp tục!", true)
                return false;
            }
        }
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Helper.toastShow("Không có quyền truy cập bộ nhớ!", true)
            // console.log("Không có quyền truy cập bộ nhớ");
            return false;
        }
        return true;
    };

    // Lấy tên file từ header
    const getFileName = (headers: any) => {
        const contentDisposition = headers["content-disposition"];
        if (contentDisposition) {
            const match = contentDisposition.match(/filename\*=UTF-8''(.+)/) || contentDisposition.match(/filename="(.+?)"/);
            return match ? decodeURIComponent(match[1]) : "downloaded-file.pdf";
        }
        return "downloaded-file.pdf";
    };

    async function openPDF(uri: string) {
        if (openWithShare) {
            // Kiểm tra thiết bị có hỗ trợ Sharing không
            if (!(await Sharing.isAvailableAsync())) {
                Helper.toastShow("Thiết bị không hỗ trợ mở file PDF.", true)
                return;
            }
            // Mở file PDF bằng ứng dụng bên ngoài
            await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
        } else {
            router.navigate({
                pathname: "/pdfViewer",
                params: { uri: uri }
            })
        }
    }

    // Lưu file vào thư mục Download
    const saveFileToDownloads = async (fileName: string, fileData: string) => {
        try {
            // 1. Kiểm tra permissions
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Cần cấp quyền truy cập storage');
            }
            // 2. Kiểm tra đường dẫn file
            const downloadPath = `${FileSystem.documentDirectory}${fileName}`;
            // console.log('Đường dẫn file:', downloadPath);

            // // 3. Kiểm tra file tồn tại
            // const fileInfo = await FileSystem.getInfoAsync(downloadPath);
            // console.log('File info:', fileInfo);

            // 4. Ghi file
            await FileSystem.writeAsStringAsync(downloadPath, fileData, {
                encoding: FileSystem.EncodingType.Base64,
            });
            // console.log('Đã ghi file:', downloadPath);
            await openPDF(downloadPath);
        } catch (error) {
            console.error('Lỗi chi tiết:', error);
            throw error;
        }
    };
    // Hàm tải file PDF
    const downloadPDF = async () => {
        setLoading(true);

        if (!(await requestStoragePermission())) {
            setLoading(false);
            return;
        }
        const baseUrl = await getLinkApi();
        try {
            let response: any;
            if (type === "download") {
                response = await axios({
                    url: baseUrl + link,
                    method: "GET",
                    responseType: "arraybuffer",
                });
            } else {
                const _headers = {
                    "Content-Type": "application/json",
                    "Accept-language": "vi",
                    "_tenant": await getTenant(),
                    "X-Orgcode": await getOrdCode(),
                    "Authorization": `Bearer ${await getToken()}`
                };
                response = await axios({
                    url: baseUrl + link,
                    method: "POST",
                    headers: { ..._headers, ...dataPost?.headers },
                    data: dataPost?.data,
                    responseType: "arraybuffer",
                });
            }

            const fileName = getFileName(response.headers).replace(/\s/g, "_");
            const filePath = `${FileSystem.documentDirectory}${fileName}`;

            // 📌 Kiểm tra nếu file đã tồn tại
            const fileInfo = await FileSystem.getInfoAsync(filePath);

            if (fileInfo.exists) {
                // console.log("⚠️ File đã tồn tại, xóa file cũ...");
                await FileSystem.deleteAsync(filePath, { idempotent: true }); // Xóa file cũ
            }

            // Nếu chưa có file thì tải về
            // console.log("⏳ File chưa có, bắt đầu tải xuống...");
            const base64Data = Buffer.from(response.data, "binary").toString("base64");

            // Lưu file và mở
            await saveFileToDownloads(fileName, base64Data);
        } catch (error) {
            Helper.toastShow("Không thể tải file PDF.", true)
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <VcPress
            style={{ width: 45, height: 45 }}
            pressStyle={{ justifyContent: "center", alignItems: "center" }}
            onPress={downloadPDF}>
            {loading ? <ActivityIndicator size="small" style={{ margin: 20 }} color={VcConstant.colors.purple} /> :
                <MaterialIcons name="cloud-download" size={24} color={VcConstant.colors.purple} />}
        </VcPress>
    );
};
export default VcBtnDownloadPdf;
