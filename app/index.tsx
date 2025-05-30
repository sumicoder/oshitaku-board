import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClockArea from './components/ClockArea';

// メインページのコンポーネント
export default function MainPage() {
    return (
        <View style={styles.container}>
            <ClockArea />
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
        height: '100%',
        position: 'relative',
    },
});
