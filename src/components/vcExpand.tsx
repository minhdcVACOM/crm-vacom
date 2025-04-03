import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import VcPress from './vcPress';
import VcCard from './vcCard';

interface IProps {
    title: string;
    children: React.ReactNode;
    isExpanded?: boolean;
    textColor?: string;
    skin?: "normal" | "small"
}

const VcExpand = ({ title, children, isExpanded = false, textColor = "black", skin = "normal" }: IProps) => {
    const [expanded, setExpanded] = useState(isExpanded);
    const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
    useEffect(() => {
        setExpanded(isExpanded);
        Animated.timing(rotateAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
        Animated.timing(rotateAnim, {
            toValue: expanded ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });
    const addStyle = {
        fontSize: (skin === "small") ? 12 : 16,
        padding: (skin === "small") ? 0 : 5,
        iconSize: (skin === "small") ? 18 : 24,
    }
    return (
        <View style={{ flexDirection: "row" }}>
            <VcCard style={{ padding: 0, margin: 0 }}>
                <VcPress onPress={toggleExpand} style={styles.header}>
                    <Animated.View style={{ transform: [{ rotate }], paddingVertical: addStyle.padding }}>
                        <Entypo name="chevron-right" size={addStyle.iconSize} color={textColor} />
                    </Animated.View>
                    <Text style={[styles.title, { color: textColor, fontSize: addStyle.fontSize, padding: addStyle.padding }]}>{title}</Text>
                </VcPress>
                {expanded && <View style={[styles.content, { padding: addStyle.padding }]}>{children}</View>}
            </VcCard>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 6,
        gap: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        padding: 5
    },
    content: {
        backgroundColor: '#f9f9f9',
        padding: 5
    },
});

export default VcExpand;
