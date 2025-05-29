import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

// メインページのコンポーネント
export default function MainPage() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/user')}>
                <Text style={styles.buttonText}>おはよう！</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
