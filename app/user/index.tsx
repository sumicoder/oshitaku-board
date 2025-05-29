import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../context/UserContext';
import { router } from 'expo-router';

// メインページのコンポーネント
export default function MainPage() {
    const { members, selectedUserIndex } = useUserContext();
    const user = members && members.length > 0 ? members[selectedUserIndex] : { name: '', taskLists: [] };

    return (
        <View style={styles.container}>
            {/* ユーザー名表示 */}
            {user && <Text style={styles.userName}>{user.name}</Text>}
            {/* タスク表示 */}
            <View style={styles.memberBox}>
                <Text style={styles.memberName}>{user?.name}</Text>
                <View style={styles.taskList}>
                    {user?.taskLists.length === 0 ? (
                        <Text style={styles.noTask}>タスクなし</Text>
                    ) : (
                        user?.taskLists.map((list, listIdx) => (
                            <View key={listIdx} style={{ marginBottom: 8 }}>
                                <Text style={{ fontWeight: 'bold', color: '#007AFF' }}>{list.name}</Text>
                                {list.tasks.length === 0 ? (
                                    <Text style={styles.noTask}>タスクなし</Text>
                                ) : (
                                    list.tasks.map((task, taskIdx) => (
                                        <View key={taskIdx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, marginRight: 4 }}>{task.image}</Text>
                                            <Text style={[styles.taskItem, { color: task.color }]}>{task.title}</Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        ))
                    )}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.push(`/user/${selectedUserIndex}`);
                    }}
                >
                    <Text style={styles.buttonText}>編集</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// スタイル定義
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#007AFF',
    },
    memberBox: {
        backgroundColor: '#f0f4ff',
        borderRadius: 10,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 16,
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    taskList: {
        marginLeft: 8,
    },
    taskItem: {
        fontSize: 14,
        color: '#333',
    },
    noTask: {
        fontSize: 13,
        color: '#aaa',
    },
    buttonContainer: {
        margin: 16,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
