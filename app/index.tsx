import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ClockArea from './components/ClockArea';
import UserTasks from './components/UserTasks';
import { useClockSetting } from './context/ClockSettingContext';
import { useUserContext } from './context/UserContext';
import { useUserSetting } from './context/UserSettingContext';

// メインページのコンポーネント
export default function MainPage() {
    const { isVisible: isClockVisible } = useClockSetting();
    const { members } = useUserContext();
    const { peopleCount } = useUserSetting();
    const visibleMembers = members.slice(0, peopleCount);
    // 表示するカラム数
    const colCount = (isClockVisible ? 1 : 0) + visibleMembers.length;
    return (
        <View style={styles.container}>
            {/* ユーザー */}
            {visibleMembers.map((_, idx) => (
                <ScrollView key={idx} contentContainerStyle={styles.col}>
                    <UserTasks userId={idx} />
                </ScrollView>
            ))}
            {/* 時計 */}
            {isClockVisible && (
                <View style={styles.clockCol}>
                    <ClockArea />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    col: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    clockCol: {
        minWidth: 0,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
