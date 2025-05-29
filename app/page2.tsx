import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// page2画面のコンポーネント
export default function Page2() {
    return (
        <View style={styles.container}>
            {/* ページタイトル */}
            <Text style={styles.title}>ページ2</Text>
            {/* ページの説明文 */}
            <Text>これはページ2の内容です。</Text>
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