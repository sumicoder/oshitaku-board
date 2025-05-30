import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClockArea from './components/ClockArea';
import UserArea from './components/UserArea';

// メインページのコンポーネント
export default function MainPage() {
    return (
        <View style={styles.container}>
            {/* ユーザー */}
            <UserArea />
            {/* 絶対配置の時計 */}
            <ClockArea />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});