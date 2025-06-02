import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClockArea from './components/ClockArea';
import UserTasks from './components/UserTasks';
import { useClockSetting } from './context/ClockSettingContext';
import { useUserContext } from './context/UserContext';
import { useUserCountSetting } from './context/UserCountSettingContext';

// メインページのコンポーネント
export default function MainPage() {
    const { isVisible, clockPosition } = useClockSetting();
    const { users } = useUserContext();
    const { userCount } = useUserCountSetting();
    const visibleUsers = users.slice(0, userCount);

    // 並び順を決定
    let columns: React.ReactNode[] = [];
    if (visibleUsers.length === 1) {
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
    } else if (visibleUsers.length === 2) {
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
                <View style={[styles.clockCol, { minWidth: 100 }]} key="clock">
                    {isVisible ? <ClockArea /> : <View style={styles.colBorder} />}
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
    } else if (visibleUsers.length === 3) {
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
    },
    col: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockCol: {
        flexShrink: 0,
        minWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
    colBorder: {
        backgroundColor: '#333',
        width: 3,
        height: '100%',
        zIndex: -1,
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        transform: [{ translateX: '-50%' }],
    },
});
