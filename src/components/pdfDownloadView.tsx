import React, { useState } from "react";
import { View, ActivityIndicator, Alert, Platform, PermissionsAndroid, Text, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer"; // Chuyển đổi binary -> base64
import VcPress from "./vcPress";
import * as Sharing from 'expo-sharing';
import axios from "axios";
import vcAxios from "@/utils/vcAxios";
import { loginHelper } from "@/utils/hooks/loginHelper";

interface IProg {
    link: string;
    type: "download" | "print" | "report";
    data?: any
}
const PdfDownloadView = (progs: IProg) => {
    const { link, type, data } = progs;
    const { getLinkApi, getToken, getOrdCode, getTenant } = loginHelper();
    const [loading, setLoading] = useState(false);
    // Hàm yêu cầu quyền lưu file (Android 9 trở xuống)
    const requestStoragePermission = async () => {
        if (Platform.OS === "android" && Platform.Version < 29) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("Lỗi", "Cần cấp quyền lưu file để tiếp tục!");
                return false;
            }
        }
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log("Không có quyền truy cập bộ nhớ");
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
        // Kiểm tra thiết bị có hỗ trợ Sharing không
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert('Lỗi', 'Thiết bị không hỗ trợ mở file PDF.');
            return;
        }
        // Mở file PDF bằng ứng dụng bên ngoài
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
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
            const downloadPath = `${FileSystem.documentDirectory}${fileName.replace(/\s/g, "_")}`;
            // console.log('Đường dẫn file:', downloadPath);

            // // 3. Kiểm tra file tồn tại
            // const fileInfo = await FileSystem.getInfoAsync(downloadPath);
            // console.log('File info:', fileInfo);

            // 4. Ghi file
            await FileSystem.writeAsStringAsync(downloadPath, fileData, {
                encoding: FileSystem.EncodingType.Base64,
            });
            console.log('Đã ghi file:', fileName);

            // // 5. Kiểm tra file sau khi ghi
            // const fileExists = await FileSystem.getInfoAsync(downloadPath);
            // console.log('File sau khi ghi:', fileExists);

            // 6. Tạo asset
            const asset = await MediaLibrary.createAssetAsync(downloadPath);
            // console.log('Asset được tạo:', asset);
            // 7. Kiểm tra asset
            if (!asset) {
                throw new Error('Không thể tạo asset');
            }
            // 8. Tạo album và lưu
            const album = await MediaLibrary.getAlbumAsync('Download');
            if (album) {
                // Xác nhận file trong album
                const assetsInAlbum0 = await MediaLibrary.getAssetsAsync({
                    album: album,
                    mediaType: ['unknown']
                });
                const existingFile0 = assetsInAlbum0.assets.find((a) => a.filename === fileName);
                if (existingFile0) await MediaLibrary.deleteAssetsAsync([existingFile0.id]);
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            } else {
                await MediaLibrary.createAlbumAsync('Download', asset, false);
            }

            // 9. Xác nhận file trong album
            const assetsInAlbum = await MediaLibrary.getAssetsAsync({
                album: album,
                mediaType: ['unknown']
            });
            const existingFile = assetsInAlbum.assets.find((a) => a.filename === fileName);

            if (existingFile) {
                await openPDF(existingFile.uri);
                // console.log('Files trong album:', assetsInAlbum["assets"][len - 1]);
                return existingFile.uri;
            }
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
                    "X-Orgcode": "6466d3792b56045d33ff90d5",
                    "Authorization": `Bearer ${await getToken()}`,
                    "X-Menu": "65a0ea3b0760cc0aee3c588f"
                };
                response = await axios({
                    url: baseUrl + link,
                    method: "POST",
                    headers: _headers,
                    data: {
                        printTemplateId: "66416e454440575e82074311",
                        typePrint: "pdf",
                        lstVoucherId: null,
                        dataObjectId: "67ea0e34934481e7f74a9a35"
                    },
                    responseType: "arraybuffer",
                });
            }

            const fileName = getFileName(response.headers).replace(/\s/g, "_");
            const filePath = `${FileSystem.documentDirectory}${fileName}`;

            // 📌 Kiểm tra nếu file đã tồn tại
            const fileInfo = await FileSystem.getInfoAsync(filePath);

            if (fileInfo.exists) {
                console.log("⚠️ File đã tồn tại, xóa file cũ...");
                await FileSystem.deleteAsync(filePath, { idempotent: true }); // Xóa file cũ
            }

            // Nếu chưa có file thì tải về
            console.log("⏳ File chưa có, bắt đầu tải xuống...");
            const base64Data = Buffer.from(response.data, "binary").toString("base64");

            // Lưu file và mở
            await saveFileToDownloads(fileName, base64Data);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải file PDF.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {loading ? <ActivityIndicator size="large" style={{ margin: 20 }} /> : null}
            <VcPress title="Tải PDF" onPress={downloadPDF} />
        </View>
    );
};
export default PdfDownloadView;
