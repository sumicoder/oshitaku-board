import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// メインページのコンポーネント
export default function MainPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* ページタイトル */}
            <Text style={styles.title}>メインページ</Text>
            {/* 詳細ページへの遷移ボタン */}
            <Button
                title="詳細ページへ"
                onPress={() => router.push('/main/detail')}
            />
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