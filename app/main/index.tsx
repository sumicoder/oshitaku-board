import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useUserContext } from '../context/UserContext';

// メインページのコンポーネント
export default function MainPage() {
    const router = useRouter();
    const { members, selectedUserIndex } = useUserContext();
    const user = members[selectedUserIndex];

    return (
        <View style={styles.container}>
            {/* ページタイトル */}
            <Text style={styles.title}>メインページ</Text>
            {/* ユーザー名表示 */}
            {user && (
                <Text style={styles.userName}>ユーザー名: {user.name}</Text>
            )}
            {/* タスク表示 */}
            <View style={styles.memberBox}>
                <Text style={styles.memberName}>{user?.name}</Text>
                <View style={styles.taskList}>
                    {user?.tasks.length === 0 ? (
                        <Text style={styles.noTask}>タスクなし</Text>
                    ) : (
                        user?.tasks.map((task, i) => (
                            <Text key={i} style={styles.taskItem}>・{task}</Text>
                        ))
                    )}
                </View>
            </View>
            {/* 詳細ページへの遷移ボタン */}
            <Button
                title="詳細ページへ"
                onPress={() => router.push('/main/detail')}
            />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
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
});