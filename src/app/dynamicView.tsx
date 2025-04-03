import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import VcPress from "@/components/vcPress";
import * as Yup from 'yup';

const data = [
    { id: "field1", row: 1, col: 1, text: "1", typeView: "inputText" },
    { id: "field2", row: 1, col: 2, text: "2", typeView: "inputText" },
    { id: "field3", row: 2, col: 1, text: "3", typeView: "inputText" },
    { id: "field4", row: 3, col: 1, text: "5", typeView: "inputText", valid: { required: true, min: 2 } },
    { id: "field5", row: 3, col: 2, text: "6", typeView: "inputText", valid: { required: true, max: 5 } }
];

const createValidationSchema = (dataCheck: typeof data) => {
    let schema: Record<string, Yup.StringSchema> = {};

    dataCheck.forEach((item) => {
        if (item.typeView === "inputText" && item.valid) {
            let field = Yup.string();

            if (item.valid.required) field = field.required("Bắt buộc nhập");
            if (item.valid.min) field = field.min(item.valid.min, `Nhập ít nhất ${item.valid.min} ký tự`);
            if (item.valid.max) field = field.max(item.valid.max, `Nhập tối đa ${item.valid.max} ký tự`);

            schema[item.id] = field;
        }
    });

    return Yup.object().shape(schema);
};

const DynamicView = () => {
    // Tạo object ban đầu cho Formik từ data
    const initialValues = data.reduce((acc, item) => {
        if (item.typeView === "inputText") {
            acc[item.id] = item.text; // Set giá trị ban đầu từ text
        }
        return acc;
    }, {} as Record<string, string>);

    // Nhóm dữ liệu theo hàng (row)
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.row]) acc[item.row] = [];
        acc[item.row].push(item);
        return acc;
    }, {} as Record<number, typeof data>);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={createValidationSchema(data)}
            onSubmit={(values) => console.log("Form Values:", values)}
        >
            {({ handleChange, values, errors, touched, handleSubmit }) => (
                <View style={styles.container}>
                    {Object.keys(groupedData).map((rowKey) => (
                        <View key={rowKey} style={styles.row}>
                            {groupedData[Number(rowKey)].map((item) => (
                                <View key={item.id} style={styles.box}>
                                    {item.typeView === "text" ? (
                                        <Text style={styles.text}>{item.text}</Text>
                                    ) : (
                                        <>
                                            <TextInput
                                                style={styles.input}
                                                value={values[item.id]}
                                                onChangeText={handleChange(`${item.id}`)}
                                                placeholder="Nhập dữ liệu..."
                                            />
                                            {touched[item.id] && errors[item.id] && (
                                                <Text style={styles.error}>{errors[item.id]}</Text>
                                            )}
                                        </>
                                    )}
                                </View>
                            ))}
                        </View>
                    ))}
                    <VcPress title="Submit" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 5
    },
    row: {
        flexDirection: "row",
        gap: 5
    },
    box: {
        flex: 1
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 5
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    }
});

export default DynamicView;
