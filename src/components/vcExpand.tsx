import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import VcPress from './vcPress';
import VcCard from './vcCard';

interface IProps {
    title: string;
    children: React.ReactNode;
    isExpanded?: boolean;
}

const VcExpand = ({ title, children, isExpanded = false }: IProps) => {
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

    return (
        <View style={{ flexDirection: "row" }}>
            <VcCard style={{ padding: 0, margin: 0 }}>
                <VcPress onPress={toggleExpand} style={styles.header}>
                    <Animated.View style={{ transform: [{ rotate }], paddingVertical: 5 }}>
                        <Entypo name="chevron-right" size={24} color="black" />
                    </Animated.View>
                    <Text style={styles.title}>{title}</Text>
                </VcPress>
                {expanded && <View style={styles.content}>{children}</View>}
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
        paddingLeft: 5,
        paddingVertical: 5
    },
    content: {
        backgroundColor: '#f9f9f9',
        padding: 5
    },
});

export default VcExpand;
