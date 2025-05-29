import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// ホーム画面のコンポーネント
export default function Home() {
    return (
        <View style={styles.container}>
            {/* ページタイトル */}
            <Text style={styles.title}>ホーム</Text>
            {/* ページの説明文 */}
            <Text>これはホーム画面です。</Text>
        </View>
    );
}

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
