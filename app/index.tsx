import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import ClockArea from './components/ClockArea';
import UserTasks from './components/UserTasks';
import { useClockSetting } from './context/ClockSettingContext';
import { useTaskDisplaySetting } from './context/TaskDisplaySettingContext';
import { useUserContext } from './context/UserContext';
import { useUserCountSetting } from './context/UserCountSettingContext';

// メインページのコンポーネント
export default function MainPage() {
    const dimensions = useWindowDimensions();
    const width = dimensions.width;
    const height = dimensions.height;
    const shortLength = Math.min(width, height);
    const longLength = Math.max(width, height);

    const [windowWidth, setWindowWidth] = useState<number>(longLength);
    const [windowHeight, setWindowHeight] = useState<number>(shortLength);

    const appState = useRef(AppState.currentState);
    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);

    const { isVisible, clockType, clockSize, clockPosition } = useClockSetting();
    const { displayMode, showCompleted } = useTaskDisplaySetting();
    const { userCount } = useUserCountSetting();
    const { users } = useUserContext();
    const visibleUsers = users.slice(0, userCount);

    const [isReady, setIsReady] = useState(false);
    const [isAppActive, setIsAppActive] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // 初期サイズをストレージに保存
    useEffect(() => {
        // 初回インストール時のみ画面サイズを保存する
        const saveInitialSizeIfNeeded = async () => {
            try {
                const hasSaved = await AsyncStorage.getItem('hasSavedInitialSize');
                if (!hasSaved) {
                    // まだ保存していなければ保存
                    await AsyncStorage.setItem('longLength', longLength.toString());
                    await AsyncStorage.setItem('shortLength', shortLength.toString());
                    await AsyncStorage.setItem('hasSavedInitialSize', 'true');
                    console.log('初回起動時の画面サイズを保存しました');
                } else {
                    // 2回目以降は何もしない
                    console.log('画面サイズは既に保存済みです');
                }
            } catch (e) {
                console.error('初回画面サイズ保存エラー', e);
            }
        };
        saveInitialSizeIfNeeded();
    }, [longLength, shortLength]);

    // orientationやdimensionsの変化時に、画面サイズが0ならストレージから復元
    useEffect(() => {
        const restoreIfZero = async () => {
            if (longLength === 0 || shortLength === 0) {
                try {
                    const storedLong = await AsyncStorage.getItem('longLength');
                    const storedShort = await AsyncStorage.getItem('shortLength');
                    if (storedLong && storedShort) {
                        setWindowWidth(parseInt(storedLong));
                        setWindowHeight(parseInt(storedShort));
                        console.log('orientation/dimensions: ストレージから画面サイズを復元', storedLong, storedShort);
                        return;
                    }
                } catch (e) {
                    console.error('orientation/dimensions: ストレージ復元エラー', e);
                }
            }
            // 通常の向き反映
            if (orientation === 3 || orientation === 4) {
                setWindowWidth(longLength);
                setWindowHeight(shortLength);
            } else if (orientation === 1) {
                setWindowWidth(shortLength);
                setWindowHeight(longLength);
            }
        };
        if (orientation) restoreIfZero();
    }, [dimensions, orientation, longLength, shortLength]);

    // アプリの状態変更を監視 フォアグランドになった時にストレージから値を取得
    useEffect(() => {
        const handleAppStateChange = async (nextAppState: string) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                setIsAppActive(true);
                // フォアグランドになった時に画面サイズが0ならストレージから復元
                if (longLength === 0 || shortLength === 0) {
                    try {
                        const storedLong = await AsyncStorage.getItem('longLength');
                        const storedShort = await AsyncStorage.getItem('shortLength');
                        if (storedLong && storedShort) {
                            setWindowWidth(parseInt(storedLong));
                            setWindowHeight(parseInt(storedShort));
                            console.log('appState: ストレージから画面サイズを復元', storedLong, storedShort);
                        }
                    } catch (e) {
                        console.error('appState: ストレージ復元エラー', e);
                    }
                }
            }
            appState.current = nextAppState as AppStateStatus;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription?.remove();
        };
    }, [longLength, shortLength]);

    // 画面の向きを取得
    useEffect(() => {
        const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
            setOrientation(evt.orientationInfo.orientation);
        });
        // 初期取得
        ScreenOrientation.getOrientationAsync().then((ori) => {
            setOrientation(ori);
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

    // orientationとdimensionsに応じてreliableDimensionsを正しく更新
    useEffect(() => {
        if (!dimensions || !orientation) return;

        if (orientation === 3 || orientation === 4) {
            setWindowWidth(longLength);
            setWindowHeight(shortLength);
        } else if (orientation === 1) {
            setWindowWidth(shortLength);
            setWindowHeight(longLength);
        }

        return;
    }, [dimensions, orientation]);

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

    // 画面サイズ取得のリトライ処理。0のときはストレージからも復元を試みる
    useEffect(() => {
        let timeout: number | null = null;
        const tryGetSize = async () => {
            try {
                if (windowWidth > 0 && windowHeight > 0) {
                    setIsReady(true);
                } else {
                    // 画面サイズが0ならストレージから復元を試みる
                    if (longLength === 0 || shortLength === 0) {
                        try {
                            const storedLong = await AsyncStorage.getItem('longLength');
                            const storedShort = await AsyncStorage.getItem('shortLength');
                            if (storedLong && storedShort) {
                                setWindowWidth(parseInt(storedLong));
                                setWindowHeight(parseInt(storedShort));
                                console.log('tryGetSize: ストレージから画面サイズを復元', storedLong, storedShort);
                            }
                        } catch (e) {
                            console.error('tryGetSize: ストレージ復元エラー', e);
                        }
                    }
                    // 取得できなければリトライ
                    timeout = setTimeout(() => {
                        if (orientation === 3 || orientation === 4) {
                            setWindowWidth(longLength);
                            setWindowHeight(shortLength);
                        } else if (orientation === 1) {
                            setWindowWidth(shortLength);
                            setWindowHeight(longLength);
                        }
                        setRetryCount((prev) => prev + 1);
                    }, 300); // 300msごとにリトライ
                }
            } catch (e) {
                // 例外が出てもリトライ
                timeout = setTimeout(() => {
                    if (orientation === 3 || orientation === 4) {
                        setWindowWidth(longLength);
                        setWindowHeight(shortLength);
                    } else if (orientation === 1) {
                        setWindowWidth(shortLength);
                        setWindowHeight(longLength);
                    }
                    setRetryCount((prev) => prev + 1);
                }, 300);
            }
        };
        tryGetSize();
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [windowWidth, windowHeight, retryCount, isAppActive, orientation, longLength, shortLength]);

    // 取得できなければ何も描画しない
    if (!isReady) {
        return null;
    }

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
