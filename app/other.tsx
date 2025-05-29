import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// その他ページのコンポーネント
export default function OtherPage() {
    return (
        <View style={styles.container}>
            {/* ページタイトル */}
            <Text style={styles.title}>その他ページ</Text>
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