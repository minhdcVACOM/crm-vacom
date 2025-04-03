import VcPress from '@/components/vcPress';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import Entypo from '@expo/vector-icons/Entypo';
import { usePopup } from '@/components/dialog/popupProvider';
import { Helper } from '@/utils/helper';
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from '@expo/vector-icons';
import { VcText } from '@/components/vcText';
import { VcConstant } from '@/utils/constant';
interface IParams {
    uri: string;
}
const PDFViewer = () => {
    const params = useLocalSearchParams() as Partial<IParams>;
    const source = { uri: params.uri, cache: true };
    const { showPopup } = usePopup();
    const fileName = params?.uri?.split("/").pop();
    const savePdf = useCallback(() => {
        if (params.uri) {
            const filePath = params.uri;
            const saveToDownload = async () => {
                try {
                    const asset = await MediaLibrary.createAssetAsync(filePath);
                    if (!asset) {
                        Helper.toastShow("Không thể tạo asset", true);
                    } else {
                        const album = await MediaLibrary.getAlbumAsync('Download');
                        let assetsInAlbum, existingFile;
                        if (album) {
                            // Xác nhận file trong album
                            assetsInAlbum = await MediaLibrary.getAssetsAsync({
                                album: album,
                                mediaType: ['unknown']
                            });
                            existingFile = assetsInAlbum.assets.find((a) => a.uri.split("/").pop() === fileName);
                            if (existingFile) await MediaLibrary.deleteAssetsAsync([existingFile.id]);
                            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                        } else {
                            await MediaLibrary.createAlbumAsync('Download', asset, false);
                        }
                        assetsInAlbum = await MediaLibrary.getAssetsAsync({
                            album: album,
                            mediaType: ['unknown']
                        });
                        existingFile = assetsInAlbum.assets.find((a) => a.uri.split("/").pop() === fileName);

                        if (existingFile) {
                            Helper.toastShow(existingFile.uri);
                        }
                    }
                } catch (error) {
                    Helper.toastShow("Không thể lưu file PDF", true);
                }
            };
            showPopup({
                message: `Bạn có muốn lưu file [${fileName}] vào thư mục Download ?`,
                iconType: "question",
                confirmText: "Có lưu",
                cancelText: "Không",
                onConfirm: saveToDownload,
                showCancel: true
            });
        }
    }, [params])
    if (!params.uri) return (<View style={[styles.container, { justifyContent: "center" }]}><Text>Không có đường dẫn file ...</Text></View>)
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.title}>
                <VcPress
                    onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={20} color="black" />
                </VcPress>
                <VcText text={fileName ?? ""} style={{ flex: 1 }} />
                <VcPress
                    onPress={savePdf}>
                    <Entypo name="save" size={20} color={VcConstant.colors.purple} />
                </VcPress>
            </View>
            <View style={styles.container}>
                {/* <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf} /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        paddingVertical: 5,
        paddingRight: 10
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default PDFViewer;
