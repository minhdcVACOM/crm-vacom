import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, BackHandler, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { router } from 'expo-router';
import { VcApi, VcConstant } from '@/utils/constant';
import VcCard from '@/components/vcCard';
import { useSelector } from 'react-redux';
import { IVcStore } from '@/redux/vcStore';
import { getApi, postApi } from '@/utils/api';
import { VcText } from '@/components/vcText';
import VcSearchBarWin from '@/components/vcSearchBarWin';
import { MenuProvider } from "react-native-popup-menu";
interface IConfig {
    permissions: {
        mnCopy?: string;
        mnDelete?: string;
        mnEdit?: string;
        mnPlus?: string;
        mnRefresh?: string;
    },
    references: any,
    voucherTemplates: {
        id: string;
        name: string;
    }[]
}
const ViewData = () => {
    const currentMenu = useSelector((state: IVcStore) => state.app.currentMenu);
    const [config, setConfig] = useState<IConfig>({ permissions: {}, references: {}, voucherTemplates: [] });
    const dataParam = {
        windowId: currentMenu?.windowId,
        menuId: currentMenu?.menuId,
        quickSearch: "",
        start: 0,
        count: 20,
        continue: null,
        filterRows: [],
        filterAdvanced: null,
        tlbparam: []
    };
    const [state, setState] = useState({
        data: [] as any[],
        page: 1,
        totalRow: 0,
        loading: false,
        refreshing: true,
        hasMore: true,
    });
    const getData = (pageNumber: number, isRefreshing = false) => {
        if (state.loading) return;
        setState(prev => ({ ...prev, loading: true }));
        const config = {
            headers: {
                "X-Menu": currentMenu?.menuId,
            }
        }
        postApi({
            link: VcApi.api.window.postPages,
            data: {
                ...dataParam,
                start: (pageNumber - 1) * dataParam.count
            },
            config: config,
            callBack: (res) => {
                const newData = res.data;
                setState(prev => ({
                    ...prev,
                    data: isRefreshing ? newData : [...prev.data, ...newData],
                    page: pageNumber,
                    totalRow: isRefreshing ? res.total_count : prev.totalRow,
                    loading: false,
                    refreshing: false,
                    hasMore: newData.length === dataParam.count,
                }));
            },
            callError: (error) => {
                setState(prev => ({ ...prev, loading: false, refreshing: false }));
            }
        })
    };

    const handleRefresh = () => {
        setState(prev => ({ ...prev, refreshing: true }));
        getData(1, true);
    };

    const handleLoadMore = () => {
        if (!state.loading && state.hasMore) {
            getData(state.page + 1);
        }
    };

    const renderFooter = () => {
        if (!state.loading || state.refreshing) return null;
        return <ActivityIndicator size="large" color={VcConstant.colors.primary} style={{ margin: 10 }} />;
    };
    useEffect(() => {
        getApi({
            link: `api/app/window/config-by-menu-id/${currentMenu?.menuId}`,
            callBack: (res) => {
                setConfig({
                    permissions: res.permissions,
                    references: res.references,
                    voucherTemplates: res.voucherTemplates
                });
                getData(1, true);
            }
        })
        const backAction = () => {
            router.back();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);
    const [txtSearch, setTxtSearch] = useState({ field: "", value: "" });
    const onSearch = (value: any, filterAdd: any) => {
        setTxtSearch(value);
    }
    return (
        <View style={styles.container}>

            <View style={{ backgroundColor: "#fff" }}>
                <VcText type='header' text={currentMenu?.title ?? ""} style={{ textAlign: "center" }} />
                <VcText type='headerLarge' text={`${state.data.length}/${state.totalRow}`} style={{ textAlign: "center" }} />
            </View>
            <MenuProvider>
                <VcSearchBarWin
                    value={txtSearch.value}
                    onSearch={onSearch}
                    quickSearch={currentMenu?.quickSearch}
                    fieldSearch={currentMenu?.fieldSearch}
                    references={config.references}
                />
                {/* Scrollable Content */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    data={state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (<VcCard key={index + ""} style={{ padding: 20, marginHorizontal: 10 }}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </VcCard>
                        )
                    }}
                    refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={handleRefresh} colors={[VcConstant.colors.primary]} />}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                />
            </MenuProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    largeHeader: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        borderBottomWidth: VcConstant.layout.borderWidth,
        borderBottomColor: VcConstant.layout.borderColor,
    },
    backButton: {
        padding: 8,
    },
    smallTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
    },
    rightIcon: {
        marginRight: 8,
    },
    item: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: VcConstant.layout.borderColor,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 16,
    },
});

export default ViewData;
