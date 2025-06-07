import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, ScaledSize, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import ClockArea from './components/ClockArea';
import UserTasks from './components/UserTasks';
import { useClockSetting } from './context/ClockSettingContext';
import { useTaskDisplaySetting } from './context/TaskDisplaySettingContext';
import { useUserContext } from './context/UserContext';
import { useUserCountSetting } from './context/UserCountSettingContext';

// メインページのコンポーネント
export default function MainPage() {
    const dimensions = useWindowDimensions();
    const [reliableDimensions, setReliableDimensions] = useState<ScaledSize>(dimensions); // 各種設定を取得
    const appState = useRef(AppState.currentState);

    const { isVisible, clockType, clockSize, clockPosition } = useClockSetting();
    const { displayMode, showCompleted } = useTaskDisplaySetting();
    const { userCount } = useUserCountSetting();
    const { users } = useUserContext();
    const visibleUsers = users.slice(0, userCount);

    const { height: windowHeight, width: windowWidth } = reliableDimensions;

    // アプリの状態変更を監視
    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                // アプリがフォアグラウンドに戻った時の処理
                console.log('アプリがフォアグラウンドに戻りました。画面サイズを更新します。', dimensions);
                setReliableDimensions(dimensions);
            }
            appState.current = nextAppState as AppStateStatus;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription?.remove();
    }, []);

    // 画面サイズが変更された時に最新のサイズを取得
    useEffect(() => {
        console.log('画面サイズが変更されました。', dimensions);
    }, [dimensions, reliableDimensions]);

    // 設定変更時のログ
    useEffect(() => {
        console.log('時計設定変更:', { isVisible, clockType, clockSize, clockPosition });
    }, [isVisible, clockType, clockSize, clockPosition]);

    useEffect(() => {
        console.log('タスク表示設定変更:', { displayMode, showCompleted });
    }, [displayMode, showCompleted]);

    useEffect(() => {
        console.log('表示人数設定変更:', { userCount });
    }, [userCount]);

    // 並び順を決定
    let columns: React.ReactNode[] = [];
    if (users.length === 0) {
        // ユーザーがいない場合の処理
        columns = [
            <View style={styles.col} key="empty">
                <Text>ユーザーが設定されていません</Text>
            </View>,
        ];
    } else if (visibleUsers.length === 1) {
        if (clockPosition === 'left') {
            columns = [
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} />}
                </View>,
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
            ];
        } else {
            // 'right'
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} />}
                </View>,
            ];
        }
    } else if (visibleUsers.length === 2) {
        if (clockPosition === 'left') {
            columns = [
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} />}
                </View>,
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={1} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
            ];
        } else if (clockPosition === 'center') {
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={[styles.clockCol, { minWidth: 100 }]} key="clock">
                    {isVisible ? <ClockArea windowHeight={windowHeight} /> : <View style={styles.colBorder} />}
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={1} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
            ];
        } else {
            // 'right'
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={0} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={1} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} />}
                </View>,
            ];
        }
    } else if (visibleUsers.length === 3) {
        columns = [
            <View style={styles.col} key="user0">
                <UserTasks userId={0} windowHeight={windowHeight} windowWidth={windowWidth} />
            </View>,
            <View style={styles.col} key="user1">
                <UserTasks userId={1} windowHeight={windowHeight} windowWidth={windowWidth} />
            </View>,
            <View style={styles.col} key="user2">
                <UserTasks userId={2} windowHeight={windowHeight} windowWidth={windowWidth} />
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
