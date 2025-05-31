import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClockArea from './components/ClockArea';
import UserTasks from './components/UserTasks';
import { useClockSetting } from './context/ClockSettingContext';
import { useUserContext } from './context/UserContext';
import { useUserSetting } from './context/UserSettingContext';

// メインページのコンポーネント
export default function MainPage() {
    const { isVisible, clockPosition } = useClockSetting();
    const { members } = useUserContext();
    const { peopleCount } = useUserSetting();
    const visibleMembers = members.slice(0, peopleCount);

    // 並び順を決定
    let columns: React.ReactNode[] = [];
    if (visibleMembers.length === 1) {
        if (clockPosition === 'left') {
            columns = [
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea />}
                </View>,
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} />
                </View>,
            ];
        } else {
            // 'right'
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea />}
                </View>,
            ];
        }
    } else if (visibleMembers.length === 2) {
        if (clockPosition === 'left') {
            columns = [
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea />}
                </View>,
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} />
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={1} />
                </View>,
            ];
        } else if (clockPosition === 'center') {
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea />}
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={1} />
                </View>,
            ];
        } else {
            // 'right'
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} />
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={1} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea />}
                </View>,
            ];
        }
    } else if (visibleMembers.length === 3) {
        columns = [
            <View style={styles.col} key="user0">
                <UserTasks userId={0} />
            </View>,
            <View style={styles.col} key="user1">
                <UserTasks userId={1} />
            </View>,
            <View style={styles.col} key="user2">
                <UserTasks userId={2} />
            </View>,
        ];
    }
    return <View style={styles.container}>{columns}</View>;
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
