
import { StyleSheet, Text, View } from "react-native";
import HomeSticky from "./homeSticky";
import HomeOvertime from "./homeOvertime";
import { Marquee } from '@animatereactnative/marquee';
import { useEffect, useState } from "react";
import { getApi } from "@/utils/api";
import { VcText } from "@/components/vcText";

const HomeTopList = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        getApi({
            link: "/api/app/user-notify/general-announcement",
            callBack: (res) => {
                if (res.data) setText(res.data);
            }
        })
    }, [])
    return (
        <View>

            {text && <Marquee spacing={20} speed={1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <Text style={{ fontWeight: "bold", paddingVertical: 10, color: "#fff" }}>{text}</Text>
            </Marquee>}
            <HomeSticky />
            <HomeOvertime />
            <VcText type="subTitle" style={{ textAlign: "center" }} text="Hỗ trợ nhiều nhất" />
        </View>
    );
}
export default HomeTopList;