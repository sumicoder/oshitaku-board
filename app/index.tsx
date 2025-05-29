import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Clock from './components/Clock';
import DigitalClock from './components/DigitalClock';
import { useClockSetting } from './context/ClockSettingContext';
import { useUserContext } from './context/UserContext';

// メインページのコンポーネント
export default function MainPage() {
    const router = useRouter();
    const { members, selectedUserIndex } = useUserContext();
    const user = members[selectedUserIndex];

    // 時計設定（グローバル）
    const { isVisible, clockType, clockSize, clockPosition } = useClockSetting();
    const { height, width } = Dimensions.get('window');
    // サイズ計算
    const sizeMap = { large: height * 0.6, medium: height * 0.4, small: height * 0.3 };
    const clockSizePx = sizeMap[clockSize];
    // 配置スタイル
    const posStyle = (() => {
        switch (clockPosition) {
            case 'left': return { left: 10, top: '25%', alignItems: 'flex-start' as const };
            case 'center': return { left: width/2 - clockSizePx/2, top: '25%', alignItems: 'center' as const };
            case 'right': return { right: 10, top: '25%', alignItems: 'flex-end' as const };
        }
    })();
    const clockContainerStyle = {
        position: 'absolute' as const,
        zIndex: -1 as const,
        width: clockSizePx,
        height: clockType === 'analog' ? clockSizePx : undefined,
        ...posStyle,
    };

    return (
        <View style={styles.container}>
            {/* 時計表示（背面絶対配置） */}
            {isVisible && (
                <View style={clockContainerStyle} pointerEvents="none">
                    {clockType === 'analog' ? (
                        <Clock size={clockSizePx} style={{ width: clockSizePx, height: clockSizePx }} />
                    ) : (
                        <DigitalClock fontSize={clockSizePx / 5} style={{ width: clockSizePx }} />
                    )}
                </View>
            )}
            {/* ユーザー名表示 */}
            {user && (
                <Text style={styles.userName}>{user.name}</Text>
            )}
            {/* タスク表示 */}
            <View style={styles.memberBox}>
                <Text style={styles.memberName}>{user?.name}</Text>
                <View style={styles.taskList}>
                    {user?.tasks.length === 0 ? (
                        <Text style={styles.noTask}>タスクなし</Text>
                    ) : (
                        user?.tasks.map((task, i) => (
                            <Text key={i} style={styles.taskItem}>・{task}</Text>
                        ))
                    )}
                </View>
            </View>
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
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#007AFF',
    },
    memberBox: {
        backgroundColor: '#f0f4ff',
        borderRadius: 10,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 16,
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    taskList: {
        marginLeft: 8,
    },
    taskItem: {
        fontSize: 14,
        color: '#333',
    },
    noTask: {
        fontSize: 13,
        color: '#aaa',
    },
});