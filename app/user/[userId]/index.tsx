import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../../context/UserContext';

// ユーザー詳細ページのコンポーネント
const UserDetailScreen = () => {
    // expo-routerからuserIdを取得
    const { userId } = useLocalSearchParams();
    // Contextからユーザー情報・タスクリスト並び替え関数を取得
    const { members, addTaskList, addTask } = useUserContext();

    // userIdはインデックスとして扱う
    const userIndex = Number(userId);
    const user = members[userIndex];

    // タスクリスト追加ハンドラ
    const handleAddTaskList = useCallback(() => {
        if (!user) return;
        if (user.taskLists.length >= 3) {
            Alert.alert('タスクリストは最大3つまでです');
            return;
        }
        // 仮のリスト名（本来はモーダルで入力）
        addTaskList(userIndex, `新しいリスト${user.taskLists.length + 1}`);
    }, [user, userIndex, addTaskList]);

    const handleAddTask = useCallback(
        (listIdx: number) => {
            if (!user) return;
            addTask(userIndex, listIdx, { title: '新しいタスク', image: '🌞', color: '#FFD700' });
        },
        [user, userIndex, addTask]
    );

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: user?.name || 'ユーザー詳細',
                    headerBackTitle: '戻る',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/user/`);
                            }}
                        >
                            <Text>戻る</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            {user ? (
                <>
                    <Text style={styles.title}>{user.name} のタスクリスト</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddTaskList}>
                        <Text style={styles.addBtnText}>＋ タスクリスト追加</Text>
                    </TouchableOpacity>
                    <View style={styles.taskList}>
                        {user.taskLists.map((list, listIdx) => (
                            <View key={listIdx} style={{ marginBottom: 8 }}>
                                <Text style={styles.taskListName}>{list.name}</Text>
                                <View style={styles.taskList}>
                                    {list.tasks.map((task, taskIdx) => (
                                        <View key={taskIdx} style={styles.taskItem}>
                                            <Text style={styles.taskImage}>{task.image}</Text>
                                            <Text style={styles.taskTitle}>{task.title}</Text>
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.addBtn} onPress={() => handleAddTask(listIdx)}>
                                    <Text style={styles.addBtnText}>＋ タスク追加</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </>
            ) : (
                <Text style={styles.errorText}>ユーザーが見つかりません</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 40,
    },
    addBtn: {
        marginBottom: 16,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 10,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskList: {
        marginBottom: 16,
    },
    taskListName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    taskImage: {
        fontSize: 16,
        marginRight: 4,
    },
    taskTitle: {
        fontSize: 16,
    },
});

export default UserDetailScreen;
