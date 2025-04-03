import VcHeader from "@/components/vcHeader";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from 'react-native-paper'
import ListMenu from "@/screens/listMenu";
import { VcConstantMenu } from "@/screens/vcConstantMenu";
const PublicScreen = () => {
    const [value, setValue] = useState<keyof typeof VcConstantMenu.public>("doc");

    return (
        <View style={{ flex: 1 }}>
            <VcHeader title="Danh mục" />
            <SegmentedButtons
                onValueChange={(value) => setValue(value as keyof typeof VcConstantMenu.public)}
                value={value}
                density="medium"
                style={styles.group}
                buttons={[
                    {
                        style: styles.button,
                        value: 'doc',
                        label: 'Tài liệu',
                    },
                    {
                        style: styles.button,
                        value: 'public',
                        label: 'Menu chung',
                    },
                    {
                        style: styles.button,
                        value: 'list',
                        label: 'Khác',
                    },
                ]}
            />
            <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
                <ListMenu data={VcConstantMenu.public[value]} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    group: { paddingHorizontal: 20, justifyContent: 'center' },
});
export default PublicScreen;