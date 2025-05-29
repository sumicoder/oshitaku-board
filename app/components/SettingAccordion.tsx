import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// アコーディオンのprops型
interface SettingAccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

// シンプルなアコーディオン（アニメーションなし、文字サイズ極小、縦スクロールのみ）
export default function SettingAccordion({ title, children, defaultOpen = false }: SettingAccordionProps) {
    // アコーディオンの開閉状態
    const [open, setOpen] = useState(defaultOpen);

    // 開閉トグル
    const toggleAccordion = () => {
        setOpen((prev) => !prev);
    };

    return (
        <View style={styles.accordionContainer}>
            <TouchableOpacity style={styles.header} onPress={toggleAccordion} activeOpacity={0.8}>
                <Text style={styles.headerText}>{title}</Text>
                <Ionicons name={open ? 'chevron-down' : 'chevron-forward'} size={18} color="#007AFF" />
            </TouchableOpacity>
            {open && (
                <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} horizontal={false} showsVerticalScrollIndicator={true}>
                    {children}
                </ScrollView>
            )}
        </View>
    );
}

// スタイル定義
const styles = StyleSheet.create({
    accordionContainer: {
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.95)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: '#e0e7ff',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        letterSpacing: 1.02,
    },
    content: {
        paddingHorizontal: 8,
        paddingBottom: 8,
        backgroundColor: 'rgba(245,250,255,0.98)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
    },
    contentContainer: {
        flexGrow: 1,
    },
});
