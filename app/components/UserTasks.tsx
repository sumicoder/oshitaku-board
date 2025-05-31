import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useClockSetting } from '../context/ClockSettingContext';
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

    const { height, width } = useWindowDimensions();
    const { isVisible, clockSize } = useClockSetting();
    const { userCount } = useUserSetting();

    const clockPx = getClockSizePx(clockSize, height);

    const containerPadding = 24;
    const taskListGap = 16;
    const taskCordBorder = 1;

    let itemMaxWidth: number;
    if (userCount === 1 && isVisible) {
        // 2カラム: 画面幅からclockSize, padding, gapを引いて2分割
        const taskColumn = 2;
        const taskColumnSpace = containerPadding * 2; // 画面左右のpadding
        const taskBorderSpace = taskCordBorder * 2 * taskColumn; // タスクの枠線の幅 * 2カラム分
        itemMaxWidth = (width - clockPx - taskColumnSpace - taskListGap - taskBorderSpace) / taskColumn;
    } else if (userCount === 2 && !isVisible) {
        // 1カラム: 画面幅からpadding, gapを引いて1カラム
        const taskColumn = 1;
        const taskColumnSpace = containerPadding * 2; // 画面左右のpadding
        const taskBorderSpace = taskCordBorder * 2 * taskColumn; // タスクの枠線の幅 * 2カラム分
        itemMaxWidth = (width - taskColumnSpace - taskBorderSpace) / userCount;
    } else {
        // 2 or 3カラム
        const numColumns = width > 600 ? 3 : 2;
        const taskColumnSpace = containerPadding * 2; // 画面左右のpadding
        const taskBorderSpace = taskCordBorder * 2 * numColumns; // タスクの枠線の幅 * 2カラム分
        const taskListGapSpace = taskListGap * (numColumns - 1); // タスクリストのgap * (カラム数 - 1)
        itemMaxWidth = (width - taskColumnSpace - taskListGapSpace - taskBorderSpace) / numColumns;
    }

    return (
        <View style={[styles.container, { paddingHorizontal: containerPadding }]}>
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
                    <ScrollView contentContainerStyle={[styles.taskScroll, { gap: taskListGap }]}>
                        {user.taskLists[selectedTab]?.tasks.length === 0 ? (
                            <Text style={styles.noTask}>タスクなし</Text>
                        ) : (
                            user.taskLists[selectedTab]?.tasks.map((task, taskIdx) => (
                                <TaskItem
                                    // props
                                    key={taskIdx}
                                    task={task}
                                    style={{ maxWidth: itemMaxWidth, borderWidth: taskCordBorder }}
                                    onPress={() => toggleTaskDone(userId, selectedTab, taskIdx)}
                                />
                            ))
                        )}
                    </ScrollView>
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
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        textAlign: 'center',
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
    },
    taskScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBlockStart: 20,
        paddingBlockEnd: 100,
    },
    noTask: {
        fontSize: 20,
        color: '#aaa',
        textAlign: 'center',
        width: '100%',
    },
});
