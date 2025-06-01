import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useClockSetting } from '../context/ClockSettingContext';
import { useTaskDisplaySetting } from '../context/TaskDisplaySettingContext';
import { useUserContext } from '../context/UserContext';
import { useUserSetting } from '../context/UserSettingContext';
import { getClockSizePx } from '../utils/clockSize';
import TaskItem from './TaskItem';

interface UserTasksProps {
    userId: number;
}

function hexToRgba(hex: string, alpha: number): string {
    // '#rgb' → '#rrggbb' に変換
    let c = hex.replace('#', '');
    if (c.length === 3) {
        c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// 時計表示専用コンポーネント
const UserTasks: React.FC<UserTasksProps> = ({ userId }) => {
    const { members, toggleTaskDone } = useUserContext();
    const user = members && members.length > 0 ? members[userId] : { name: '', taskLists: [] };
    const [selectedTab, setSelectedTab] = useState(0);
    // const [showDoneIdx, setShowDoneIdx] = useState<number | null>(null);
    // const timerRef = useRef<number | null>(null);
    // const doneShowTime = 2000;

    const { height, width } = useWindowDimensions();
    const { isVisible, clockSize } = useClockSetting();
    const { userCount } = useUserSetting();
    const { displayMode, showCompleted } = useTaskDisplaySetting();

    // ユーザーのタスクを取得
    const tasks = user.taskLists[selectedTab]?.tasks;

    // 時計の幅を取得
    const clockSizePx = getClockSizePx(clockSize, height);
    const clockColumnSize = isVisible && userCount !== 3 ? clockSizePx : 0;

    // 定数定義
    const MAGIC_MIN_WIDTH = 100; // ユーザー数2、時計非表示の場合の`minWidth` => index.tsxにある
    const MAGIC_HEIGHT = 260; // マジックナンバー[ヘッダー、ユーザー名、タブなどの`margin`や`padding`や`gap`など適当な値]
    // タスクのカラム数
    const CONTAINER_WIDTH = (width - clockColumnSize) / userCount;
    const TASK_COLUMN = displayMode === 'single' ? 1 : CONTAINER_WIDTH > 1080 ? 3 : CONTAINER_WIDTH > 600 ? 2 : 1;
    // コンテナのpadding
    const CONTAINER_PADDING = 24;
    const TASK_COLUMN_SPACE = displayMode === 'single' ? CONTAINER_PADDING * 2 * userCount : CONTAINER_PADDING * 2; // 画面左右のpadding
    // タスクリストのgap
    const TASK_LIST_GAP = 16;
    const TASK_LIST_GAP_SPACE = TASK_LIST_GAP * TASK_COLUMN;
    // タスクの高さ
    const TASK_HEIGHT = height - MAGIC_HEIGHT;
    // タスクの枠線の幅
    const TASK_CORD_BORDER = 1;
    const TASK_BORDER_WIDTH = TASK_CORD_BORDER * 2;
    const TASK_BORDER_SPACE = TASK_BORDER_WIDTH * userCount * TASK_COLUMN;

    // タスクの最大幅を計算
    let itemMaxWidth: number;
    if (userCount === 2 && !isVisible) {
        // ユーザー表示2、時計非表示の場合のみ中央に余白あり
        itemMaxWidth = (width - TASK_COLUMN_SPACE - TASK_BORDER_SPACE - TASK_LIST_GAP_SPACE - clockColumnSize - MAGIC_MIN_WIDTH) / userCount;
    } else if (displayMode === 'single') {
        // タスク単一表示
        itemMaxWidth = (width - TASK_COLUMN_SPACE - TASK_BORDER_SPACE - TASK_LIST_GAP_SPACE - clockColumnSize) / userCount;
    } else {
        itemMaxWidth = (width - TASK_COLUMN_SPACE - TASK_BORDER_SPACE - TASK_LIST_GAP_SPACE - clockColumnSize) / TASK_COLUMN;
    }

    return (
        <View style={[styles.container, { paddingHorizontal: CONTAINER_PADDING }]}>
            {/* ユーザー名表示 */}
            {user && <Text style={styles.userName}>{user.name}</Text>}
            {/* タブUI */}
            <View style={styles.tabContainer}>
                <ScrollView horizontal contentContainerStyle={styles.tabScroll}>
                    {user.taskLists.map((list, idx) => (
                        <TouchableOpacity key={idx} style={[styles.tab, selectedTab === idx && styles.tabSelected]} onPress={() => setSelectedTab(idx)}>
                            <Text style={selectedTab === idx ? styles.tabTextSelected : styles.tabText}>{list.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 選択中のタスクリストのみ表示 */}
            {user.taskLists.length === 0 ? (
                <Text style={styles.noTask}>タスクなし</Text>
            ) : (
                <View style={styles.taskContainer}>
                    {tasks.length === 0 ? (
                        <Text style={styles.noTask}>タスクなし</Text>
                    ) : displayMode === 'single' ? (
                        // 単一表示: 横並び・スナップ
                        <ScrollView
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
                                    width: (itemMaxWidth + TASK_LIST_GAP_SPACE) * (tasks.length || 1),
                                },
                            ]}
                        >
                            {(() => {
                                const userTasks = tasks || [];
                                const undoneTasks = userTasks.filter((task) => !task.done);
                                if (undoneTasks.length === 0) {
                                    return (
                                        <View style={{ width: CONTAINER_WIDTH, alignItems: 'center', justifyContent: 'center', paddingBlockStart: 32 }}>
                                            <Text style={{ fontSize: 28, color: '#22a', fontWeight: 'bold' }}>ぜんぶできたね！</Text>
                                        </View>
                                    );
                                }
                                // 直前に"できた"にしたタスクがあればそれを3秒間表示
                                // if (showDoneIdx !== null) {
                                //     const doneTask = userTasks[showDoneIdx];
                                //     if (doneTask) {
                                //         return (
                                //             <TaskItem
                                //                 key={showDoneIdx}
                                //                 task={{ ...doneTask, done: true }}
                                //                 style={{ width: itemMaxWidth, height: '75%', alignItems: 'center', justifyContent: 'center', borderWidth: TASK_CORD_BORDER }}
                                //                 onPress={() => {}}
                                //             />
                                //         );
                                //     }
                                // }
                                // const firstUndone = undoneTasks[0];
                                // const taskIdx = userTasks.findIndex((t) => t === firstUndone);
                                return userTasks.map((task, taskIdx) => (
                                    <TaskItem
                                        key={taskIdx}
                                        task={task}
                                        style={{
                                            marginHorizontal: TASK_LIST_GAP_SPACE / 2,
                                            width: itemMaxWidth,
                                            height: TASK_HEIGHT,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: TASK_CORD_BORDER,
                                            borderRadius: 0,
                                        }}
                                        onPress={() => {
                                            // setShowDoneIdx(taskIdx);
                                            toggleTaskDone(userId, selectedTab, taskIdx);
                                            // if (timerRef.current) clearTimeout(timerRef.current);
                                            // timerRef.current = setTimeout(() => {
                                            //     setShowDoneIdx(null);
                                            // }, doneShowTime);
                                        }}
                                    />
                                ));
                            })()}
                        </ScrollView>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.taskScroll, { gap: TASK_LIST_GAP }]}>
                            {
                                // 一覧表示
                                tasks
                                    .filter((task) => showCompleted || !task.done)
                                    .map((task, taskIdx) => (
                                        <TaskItem
                                            key={taskIdx}
                                            task={task}
                                            style={{ maxWidth: itemMaxWidth, borderWidth: TASK_CORD_BORDER }}
                                            onPress={() => toggleTaskDone(userId, selectedTab, taskIdx)}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        textAlign: 'center',
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
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
    tabSelected: {
        borderBottomColor: '#007AFF',
    },
    tabText: {
        color: '#333',
        fontWeight: 'bold',
    },
    tabTextSelected: {
        color: '#007AFF',
        fontWeight: 'bold',
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
