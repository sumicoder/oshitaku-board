import { RelativePathString, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ClockSettingAccordion from './settings/ClockSettingAccordion';
import PeopleCountSettingAccordion from './settings/PeopleCountSettingAccordion';
import ProgressBarSettingAccordion from './settings/ProgressBarSettingAccordion';
import TaskDisplaySettingAccordion from './settings/TaskDisplaySettingAccordion';

// ページリンク情報の配列
const pageLinks = [
    { path: '/main', label: 'メインページ' },
    { path: '/(tabs)', label: 'タブ' },
    { path: '/page1', label: 'ページ1' },
    { path: '/page2', label: 'ページ2' },
    { path: '/other', label: 'その他ページ' },
];

// カスタムドロワーコンテンツ（ページリンク＋各種設定アコーディオン）
export default function CustomDrawerContent() {
    const router = useRouter();
    const pathname = usePathname();

    // ページ遷移用リンクの共通関数
    const handleLinkPress = (path: string) => {
        if (pathname !== path) {
            router.push(path as RelativePathString);
        }
    };

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
            {/* ページ遷移リンク */}
            {pageLinks.map((link) => (
                <TouchableOpacity
                    key={link.path}
                    style={[styles.linkRow, pathname === link.path && styles.activeLinkRow]}
                    onPress={() => handleLinkPress(link.path)}
                    disabled={pathname === link.path} // 現在ページはタップ不可
                >
                    <Text style={[styles.linkText, pathname === link.path && styles.activeLinkText]}>{link.label}</Text>
                </TouchableOpacity>
            ))}

            {/* 各種設定アコーディオン */}
            <ClockSettingAccordion />
            <ProgressBarSettingAccordion />
            <TaskDisplaySettingAccordion />
            <PeopleCountSettingAccordion />
        </ScrollView>
    );
}

// スタイル定義
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingTop: 40,
        paddingBottom: 40,
    },
    linkRow: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    activeLinkRow: {
        backgroundColor: '#e6f0ff', // 現在ページの背景色を強調
    },
    linkText: {
        fontSize: 16,
        color: '#007AFF',
    },
    activeLinkText: {
        color: '#0051a8', // 現在ページの文字色を濃く
        fontWeight: 'bold', // 太字
    },
});
