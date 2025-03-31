import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import HomeBarChart from "./homeBarChart";
import HomePieChart from "./homePieChart";
import VcHeader from "@/components/vcHeader";
import { apiGetDashboardListChart } from "@/utils/apiHome";

const width = Dimensions.get("window").width - 20;
const HomeHeader = () => {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };
    const [data, setData] = React.useState([[], []]);
    React.useEffect(() => {
        apiGetDashboardListChart(res => {
            setData(res)
        })
    }, []);
    return (
        <>
            <VcHeader title="Trang chủ" />
            <View style={styles.container}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width / 2}
                    data={data}
                    onProgressChange={progress}
                    renderItem={({ item, index }) => (
                        index == 0 ? <HomeBarChart data={item} index={index} /> : <HomePieChart data={item} index={index} />
                    )}
                />
                <Pagination.Basic
                    progress={progress}
                    data={data}
                    dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                    containerStyle={{ gap: 5, marginBottom: 5 }}
                    onPress={onPressPagination}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        gap: 10,
        margin: 10,
        borderRadius: 20
    }
})
export default HomeHeader;
