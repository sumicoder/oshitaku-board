import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../context/UserContext';

interface UserTasksProps {
    userId: number;
}

// 時計表示専用コンポーネント
const UserTasks: React.FC<UserTasksProps> = ({ userId }) => {
    const { members } = useUserContext();
    const user = members && members.length > 0 ? members[userId] : { name: '', taskLists: [] };
    // タブの選択状態
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* ユーザー名表示 */}
            {user && <Text style={styles.userName}>{user.name}</Text>}
            {/* タブUI */}
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                {user.taskLists.map((list, idx) => (
                    <TouchableOpacity key={idx} style={[styles.tab, selectedTab === idx && styles.tabSelected]} onPress={() => setSelectedTab(idx)}>
                        <Text style={selectedTab === idx ? styles.tabTextSelected : styles.tabText}>{list.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 選択中のタスクリストのみ表示 */}
            <View style={styles.memberBox}>
                <View style={styles.taskListContainer}>
                    {user.taskLists.length === 0 ? (
                        <View style={styles.taskList}>
                            <Text style={styles.noTask}>タスクなし</Text>
                        </View>
                    ) : (
                        <View style={styles.taskList}>
                            <View style={{ marginBottom: 8 }}>
                                {user.taskLists[selectedTab]?.tasks.length === 0 ? (
                                    <Text style={styles.noTask}>タスクなし</Text>
                                ) : (
                                    user.taskLists[selectedTab]?.tasks.map((task, taskIdx) => (
                                        <View key={taskIdx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, marginRight: 4 }}>{task.image}</Text>
                                            <Text style={[styles.taskItem, { color: task.color }]}>{task.title}</Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default UserTasks;

// スタイル定義
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#007AFF',
    },
    memberBox: {
        marginVertical: 6,
        marginHorizontal: 16,
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    taskListContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    taskList: {
        backgroundColor: '#fff',
        marginLeft: 8,
        borderRadius: 10,
        padding: 12,
    },
    taskItem: {
        fontSize: 14,
        color: '#333',
    },
    noTask: {
        fontSize: 13,
        color: '#aaa',
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
});
