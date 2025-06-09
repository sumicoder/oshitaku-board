import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useClockSetting } from '../context/ClockSettingContext';
import { useProgressBarSetting } from '../context/ProgressBarSettingContext';
import { useTaskDisplaySetting } from '../context/TaskDisplaySettingContext';
import { useUserContext } from '../context/UserContext';
import { useUserCountSetting } from '../context/UserCountSettingContext';
import { getClockSizePx } from '../utils/clockSize';
import TaskItem from './TaskItem';

interface UserTasksProps {
    userId: string;
    windowHeight: number;
    windowWidth: number;
}

const UserTasks: React.FC<UserTasksProps> = ({ userId, windowHeight, windowWidth }) => {
    const { users, toggleTaskDone, selectUser } = useUserContext();
    const currentUser = users.find((user) => user.id === userId) || { id: Math.random().toString(36).substring(2, 15), name: 'ユーザー', taskLists: [], color: '#007AFF' };

    if (currentUser?.taskLists.length === 0) {
        // タスクリストがない場合の表示
        return (
            <View style={styles.container}>
                {/* ユーザー名表示 */}
                {currentUser && (
                    <TouchableOpacity
                        onPress={() => {
                            selectUser(userId);
                            router.push(`/user/${userId}`);
                        }}
                    >
                        <View style={styles.userName}>
                            <Text style={[styles.userNameText, { color: currentUser.color }]}>{currentUser.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {/* タブUI */}
                <View style={[styles.tabContainer, { marginBlockStart: 40 }]}>
                    <Text style={styles.noTask}>タスクリストがありません</Text>
                </View>
            </View>
        );
    }
    const [selectedTab, setSelectedTab] = useState<string>(currentUser.taskLists[0].id || '');
    const scrollRef = useRef<ScrollView>(null);
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [showDoneId, setShowDoneId] = useState<string | null>(null);
    const timerRef = useRef<number | null>(null);
    const doneShowTime = 2000;

    const { isVisible, clockSize, clockPosition } = useClockSetting();
    const { userCount } = useUserCountSetting();
    const { displayMode, showCompleted } = useTaskDisplaySetting();
    const { isProgressBarVisible } = useProgressBarSetting();

    // ユーザーのタスクを取得
    const tasks = currentUser.taskLists.find((list) => list.id === selectedTab)?.tasks;
    const total = tasks?.length || 0;
    const done = tasks?.filter((t) => t.done).length || 0;
    const percent = total > 0 ? done / total : 0;

    // 時計の幅を取得
    const clockSizePx = getClockSizePx(clockSize, Math.min(windowHeight, windowWidth));
    const clockColumnSize = isVisible && userCount !== 3 ? clockSizePx : 0;

    // 定数定義
    const MAGIC_MIN_WIDTH = 100; // ユーザー数2、時計非表示の場合の`minWidth` => index.tsxにある
    const MAGIC_HEIGHT = 260; // マジックナンバー[ヘッダー、ユーザー名、タブなどの`margin`や`padding`や`gap`など適当な値]
    // タスクのカラム数
    const containerWidth = (windowWidth - clockColumnSize) / userCount;
    const TASK_COLUMN = displayMode === 'single' ? 1 : containerWidth > 1080 ? 3 : containerWidth > 600 ? 2 : 1;
    // コンテナのpadding
    const CONTAINER_PADDING = 24;
    const TASK_COLUMN_SPACE = displayMode === 'single' ? CONTAINER_PADDING * 2 * userCount : CONTAINER_PADDING * 2; // 画面左右のpadding
    // タスクリストのgap
    const TASK_LIST_GAP = 16;
    const TASK_LIST_GAP_SPACE = TASK_LIST_GAP * TASK_COLUMN;
    // タスクの高さ
    const taskHeight = windowHeight - MAGIC_HEIGHT;
    // タスクの枠線の幅
    const TASK_CORD_BORDER = 1;
    const TASK_BORDER_WIDTH = TASK_CORD_BORDER * 2;
    const TASK_BORDER_SPACE = TASK_BORDER_WIDTH * userCount * TASK_COLUMN;

    // タスクの最大幅を計算
    let itemMaxWidth: number;
    if (userCount === 2 && !isVisible) {
        // ユーザー表示2、時計非表示の場合のみ中央に余白あり
        itemMaxWidth = (windowWidth - TASK_COLUMN_SPACE - TASK_BORDER_SPACE - TASK_LIST_GAP_SPACE - clockColumnSize - MAGIC_MIN_WIDTH) / userCount;
    } else if (displayMode === 'single') {
        // タスク単一表示
        itemMaxWidth = (windowWidth - TASK_COLUMN_SPACE - TASK_BORDER_SPACE - TASK_LIST_GAP_SPACE - clockColumnSize) / userCount;
    } else {
        itemMaxWidth = (windowWidth - TASK_COLUMN_SPACE - TASK_BORDER_SPACE - TASK_LIST_GAP_SPACE - clockColumnSize) / TASK_COLUMN;
    }

    // スクロール位置を左端に戻す
    useEffect(() => {
        if (displayMode === 'single' && scrollRef.current) {
            scrollRef.current.scrollTo({ x: 0, animated: false });
        }
    }, [isVisible, clockSize, clockPosition, userCount, selectedTab, displayMode, userId]);

    return (
        <View style={[styles.container, { paddingHorizontal: CONTAINER_PADDING }]}>
            {/* ユーザー名表示 */}
            {currentUser && (
                <TouchableOpacity
                    onPress={() => {
                        selectUser(userId);
                        router.push(`/user/${userId}`);
                    }}
                >
                    <View style={styles.userName} onLayout={(e) => setProgressBarWidth(e.nativeEvent.layout.width)}>
                        <Text style={[styles.userNameText, { color: currentUser.color }]}>{currentUser.name}</Text>
                        {isProgressBarVisible && (
                            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: currentUser.color, zIndex: -1, transform: [{ translateX: (-1 + percent) * progressBarWidth }] }} />
                        )}
                    </View>
                </TouchableOpacity>
            )}
            {/* タブUI */}
            <View style={styles.tabContainer}>
                <ScrollView horizontal contentContainerStyle={styles.tabScroll}>
                    {currentUser.taskLists.map((list) => (
                        <TouchableOpacity
                            key={list.id}
                            style={[styles.tab, { borderBottomColor: selectedTab === list.id ? currentUser.color : 'transparent' }]}
                            onPress={() => setSelectedTab(list.id)}
                        >
                            <Text style={[styles.tabText, { fontWeight: selectedTab === list.id ? 'bold' : 'normal', color: selectedTab === list.id ? currentUser.color : '#333' }]}>{list.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 選択中のタスクリストのみ表示 */}
            {currentUser.taskLists.length === 0 ? (
                <Text style={styles.noTask}>タスクなし</Text>
            ) : (
                <View style={styles.taskContainer}>
                    {tasks?.length === 0 ? (
                        <Text style={styles.noTask}>タスクなし</Text>
                    ) : displayMode === 'single' ? (
                        // 単一表示: 横並び・スナップ
                        <ScrollView
                            ref={scrollRef}
                            horizontal
                            pagingEnabled
                            snapToInterval={itemMaxWidth + TASK_LIST_GAP_SPACE}
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={true}
                            contentContainerStyle={[
                                styles.taskScroll,
                                {
                                    paddingBlockEnd: 0,
                                    flexDirection: 'row',
                                    height: '100%',
                                    width: (itemMaxWidth + TASK_LIST_GAP_SPACE) * (tasks?.length || 1),
                                },
                            ]}
                        >
                            {(() => {
                                return tasks?.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        currentUser={currentUser}
                                        task={task}
                                        style={{
                                            marginHorizontal: TASK_LIST_GAP_SPACE / 2,
                                            width: itemMaxWidth,
                                            height: taskHeight,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: TASK_CORD_BORDER,
                                            borderRadius: 0,
                                        }}
                                        onPress={() => toggleTaskDone(userId, selectedTab || '', task.id)}
                                    />
                                ));
                            })()}
                        </ScrollView>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.taskScroll, { gap: TASK_LIST_GAP }]}>
                            {(() => {
                                const undoneTasks = tasks?.filter((task) => !task.done);
                                if (undoneTasks && undoneTasks.length === 0 && !showCompleted) {
                                    return (
                                        <View style={{ width: containerWidth, alignItems: 'center', justifyContent: 'center', paddingBlockStart: 32 }}>
                                            <Text style={{ fontSize: 28, color: '#22a', fontWeight: 'bold' }}>ぜんぶできたね！</Text>
                                        </View>
                                    );
                                }
                            })()}
                            {(() => {
                                // 直前に"できた"にしたタスクがあればそれを3秒間表示
                                if (showDoneId !== null) {
                                    const doneTask = tasks?.find((task) => task.id === showDoneId);
                                    if (doneTask) {
                                        return (
                                            <TaskItem
                                                key={showDoneId}
                                                currentUser={currentUser}
                                                task={{ ...doneTask, done: true }}
                                                style={{ maxWidth: itemMaxWidth, borderWidth: TASK_CORD_BORDER }}
                                                onPress={() => {}}
                                            />
                                        );
                                    }
                                }
                            })()}
                            {
                                // 一覧表示
                                tasks
                                    ?.filter((task) => showCompleted || !task.done)
                                    .map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            currentUser={currentUser}
                                            task={task}
                                            style={{ maxWidth: itemMaxWidth, borderWidth: TASK_CORD_BORDER }}
                                            onPress={() => {
                                                if (!showCompleted) {
                                                    setShowDoneId(task.id);
                                                }
                                                toggleTaskDone(userId, selectedTab || '', task.id);
                                                if (timerRef.current) {
                                                    clearTimeout(timerRef.current);
                                                }
                                                timerRef.current = setTimeout(() => {
                                                    setShowDoneId(null);
                                                }, doneShowTime);
                                            }}
                                        />
                                    ))
                            }
                        </ScrollView>
                    )}
                </View>
            )}
        </View>
    );
};

export default UserTasks;

// スタイル定義
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        width: '100%',
        height: '100%',
    },
    userName: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    userNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    // タブUI
    tabContainer: {
        height: 40,
        marginVertical: 8,
    },
    tabScroll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginRight: 8,
    },
    tabText: {
        color: '#333',
    },
    // タスクUI
    taskContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    taskScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBlockStart: 20,
        paddingBlockEnd: 100,
        width: '100%',
    },
    noTask: {
        fontSize: 20,
        color: '#aaa',
        textAlign: 'center',
        width: '100%',
    },
});
