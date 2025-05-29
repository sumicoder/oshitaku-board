import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 詳細ページのコンポーネント
export default function DetailPage() {
    return (
        <View style={styles.container}>
            {/* ページタイトル */}
            <Text style={styles.title}>詳細ページ</Text>
        </View>
    );
}

// スタイル定義
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
}); 