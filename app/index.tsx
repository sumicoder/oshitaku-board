import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, AppStateStatus, Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ClockArea from './components/ClockArea';
import UserTasks from './components/UserTasks';
import { useClockSetting } from './context/ClockSettingContext';
import { useTaskDisplaySetting } from './context/TaskDisplaySettingContext';
import { colorList, useUserContext } from './context/UserContext';
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
    const { users, addUser } = useUserContext();
    const visibleUsers = users.slice(0, userCount);

    const [isReady, setIsReady] = useState(false);
    const [isAppActive, setIsAppActive] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [selectedColor, setSelectedColor] = useState(colorList[0]);

    useEffect(() => {
        // 横向き（ランドスケープ）に固定
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }, []);

    // 初期サイズをストレージに保存
    useEffect(() => {
        // 初回インストール時のみ画面サイズを保存する
        const saveInitialSizeIfNeeded = async () => {
            try {
                const hasSaved = await AsyncStorage.getItem('hasSavedInitialSize');
                if (!hasSaved && longLength > 0 && shortLength > 0) {
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

    // --- 共通関数 ---
    // 画面の向きに応じてwindowWidth/windowHeightをセット
    function applyDimensionsByOrientation(
        orientation: ScreenOrientation.Orientation | null,
        longLength: number,
        shortLength: number,
        setWindowWidth: (v: number) => void,
        setWindowHeight: (v: number) => void
    ) {
        if (orientation === 3 || orientation === 4) {
            setWindowWidth(longLength);
            setWindowHeight(shortLength);
        } else if (orientation === 1) {
            setWindowWidth(shortLength);
            setWindowHeight(longLength);
        }
    }

    // ストレージから画面サイズを復元
    async function restoreDimensionsFromStorage(setWindowWidth: (v: number) => void, setWindowHeight: (v: number) => void) {
        try {
            const storedLong = await AsyncStorage.getItem('longLength');
            const storedShort = await AsyncStorage.getItem('shortLength');
            if (storedLong && storedShort) {
                if (orientation === 3 || orientation === 4) {
                    setWindowWidth(parseInt(storedLong));
                    setWindowHeight(parseInt(storedShort));
                } else if (orientation === 1) {
                    setWindowWidth(parseInt(storedShort));
                    setWindowHeight(parseInt(storedLong));
                }
                console.log('AsyncStorageから画面サイズを復元');
            }
        } catch (e) {
            console.error('画面サイズのストレージ復元エラー', e);
        }
    }

    // orientationやdimensionsの変化時に、画面サイズが0ならストレージから復元
    useEffect(() => {
        const update = async () => {
            if (longLength === 0 || shortLength === 0) {
                await restoreDimensionsFromStorage(setWindowWidth, setWindowHeight);
            } else {
                applyDimensionsByOrientation(orientation, longLength, shortLength, setWindowWidth, setWindowHeight);
            }
        };
        if (orientation) {
            update();
        }
    }, [dimensions, orientation, longLength, shortLength]);

    // アプリの状態変更を監視 フォアグランドになった時にストレージから値を取得
    useEffect(() => {
        const handleAppStateChange = async (nextAppState: string) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                setIsAppActive(true);
                if (longLength === 0 || shortLength === 0) {
                    await restoreDimensionsFromStorage(setWindowWidth, setWindowHeight);
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

    // 設定変更時のログ
    useEffect(() => {
        console.log('時計設定変更:', { isVisible, clockType, clockSize, clockPosition });
    }, [isVisible, clockType, clockSize, clockPosition]);

    useEffect(() => {
        console.log('やること表示設定変更:', { displayMode, showCompleted });
    }, [displayMode, showCompleted]);

    useEffect(() => {
        console.log('表示人数設定変更:', { userCount });
    }, [userCount]);

    // 画面サイズ取得のリトライ処理。0のときはストレージからも復元を試みる
    useEffect(() => {
        let timeout: number | null = null;
        const maxRetry = 30; // 最大リトライ回数（約9秒）
        const tryGetSize = async () => {
            if (windowWidth > 0 && windowHeight > 0) {
                setIsReady(true);
            } else if (retryCount < maxRetry) {
                // 取得できていなければストレージからも復元を試みる
                if (longLength === 0 || shortLength === 0) {
                    await restoreDimensionsFromStorage(setWindowWidth, setWindowHeight);
                }
                // 300ms後に再度取得を試みる
                timeout = setTimeout(() => {
                    applyDimensionsByOrientation(orientation, longLength, shortLength, setWindowWidth, setWindowHeight);
                    setRetryCount((prev) => prev + 1); // これでuseEffectが再発火
                }, 300);
            } else {
                // 上限に達した場合も一応描画は行う
                setIsReady(true);
            }
        };
        tryGetSize();
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [windowWidth, windowHeight, retryCount, isAppActive, orientation, longLength, shortLength]);

    // 取得できなければローディングインジケーターを表示
    if (!isReady) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>画面サイズを取得中...</Text>
            </View>
        );
    }

    // 並び順を決定
    let columns: React.ReactNode[] = [];
    if (users.length === 0) {
        // ユーザーがいない場合の処理
        columns = [
            <View style={[styles.col, { gap: 20 }]} key="empty">
                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20 }}>ユーザーが設定されていません</Text>
                <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 8 }} onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, color: '#fff' }}>ユーザーを設定する</Text>
                </TouchableOpacity>
                {/* ユーザー追加モーダル */}
                <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>ユーザー名を入力</Text>
                            <TextInput style={styles.input} placeholder="名前" value={newUserName} onChangeText={setNewUserName} />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12 }}>色を選択</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                {colorList.map((color) => (
                                    <TouchableOpacity
                                        key={color}
                                        style={[styles.colorButton, { backgroundColor: color }, selectedColor === color && styles.colorButtonSelected]}
                                        onPress={() => setSelectedColor(color)}
                                    />
                                ))}
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                <TouchableOpacity
                                    style={styles.modalBtn}
                                    onPress={() => {
                                        if (newUserName.trim()) {
                                            addUser(newUserName.trim(), selectedColor);
                                            setNewUserName('');
                                            setModalVisible(false);
                                        }
                                    }}
                                >
                                    <Text style={{ color: '#fff' }}>追加</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#aaa' }]} onPress={() => setModalVisible(false)}>
                                    <Text style={{ color: '#fff' }}>キャンセル</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>,
        ];
    } else if (visibleUsers.length === 1) {
        if (clockPosition === 'left') {
            columns = [
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} windowWidth={windowWidth} />}
                </View>,
                <View style={styles.col} key="user0">
                    <UserTasks userId={users[0].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
            ];
        } else {
            // 'right'
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={users[0].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} windowWidth={windowWidth} />}
                </View>,
            ];
        }
    } else if (visibleUsers.length === 2) {
        if (clockPosition === 'left') {
            columns = [
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} windowWidth={windowWidth} />}
                </View>,
                <View style={styles.col} key="user0">
                    <UserTasks userId={users[0].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={users[1].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
            ];
        } else if (clockPosition === 'center') {
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={users[0].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={[styles.clockCol, { minWidth: 100 }]} key="clock">
                    {isVisible ? <ClockArea windowHeight={windowHeight} windowWidth={windowWidth} /> : <View style={styles.colBorder} />}
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={users[1].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
            ];
        } else {
            // 'right'
            columns = [
                <View style={styles.col} key="user0">
                    <UserTasks userId={users[0].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.col} key="user1">
                    <UserTasks userId={users[1].id} windowHeight={windowHeight} windowWidth={windowWidth} />
                </View>,
                <View style={styles.clockCol} key="clock">
                    {isVisible && <ClockArea windowHeight={windowHeight} windowWidth={windowWidth} />}
                </View>,
            ];
        }
    } else if (visibleUsers.length === 3) {
        columns = [
            <View style={styles.col} key="user0">
                <UserTasks userId={users[0].id} windowHeight={windowHeight} windowWidth={windowWidth} />
            </View>,
            <View style={styles.col} key="user1">
                <UserTasks userId={users[1].id} windowHeight={windowHeight} windowWidth={windowWidth} />
            </View>,
            <View style={styles.col} key="user2">
                <UserTasks userId={users[2].id} windowHeight={windowHeight} windowWidth={windowWidth} />
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        marginVertical: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: 200,
        marginTop: 12,
        fontSize: 16,
    },
    colorButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    colorButtonSelected: {
        borderColor: '#007AFF',
        borderWidth: 3,
    },
    modalBtn: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 8,
    },
});
