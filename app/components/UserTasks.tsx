import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../context/UserContext';

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
    const { members } = useUserContext();
    const user = members && members.length > 0 ? members[userId] : { name: '', taskLists: [] };
    // タブの選択状態
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <View style={styles.container}>
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
                    <ScrollView contentContainerStyle={styles.taskScroll}>
                        {user.taskLists[selectedTab]?.tasks.length === 0 ? (
                            <Text style={styles.noTask}>タスクなし</Text>
                        ) : (
                            user.taskLists[selectedTab]?.tasks.map((task, taskIdx) => (
                                <View
                                    key={taskIdx}
                                    style={[
                                        styles.taskItem,
                                        { borderColor: 'black', borderWidth: 1 },
                                        // { backgroundColor: hexToRgba(task.color, 0.2) }
                                    ]}
                                >
                                    <Text style={styles.taskIcon}>{task.image}</Text>
                                    <Text style={styles.taskTitle}>{task.title}</Text>
                                </View>
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
        marginHorizontal: 24,
        textAlign: 'center',
    },
    // タブUI
    tabContainer: {
        height: 40,
        marginBottom: 8,
    },
    tabScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24,
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
    noTask: {
        fontSize: 20,
        color: '#aaa',
        textAlign: 'center',
    },
    taskContainer: {
        flex: 1,
        width: '100%',
    },
    taskScroll: {
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingBlockStart: 20,
        paddingBlockEnd: 100,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
    },
    taskIcon: {
        fontSize: 24,
        marginRight: 24,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 200,
        maxWidth: 250,
    },
});
