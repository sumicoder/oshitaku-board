import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../../context/UserContext';

// ユーザー詳細ページのコンポーネント
const UserDetailScreen = () => {
    // expo-routerからuserIdを取得
    const { userId } = useLocalSearchParams();
    // Contextからユーザー情報・タスクリスト並び替え関数を取得
    const { user, addTaskList, addTask, editTaskListName, deleteTaskList, editTask, deleteTask } = useUserContext();

    // userIdはインデックスとして扱う
    const userIndex = Number(userId);
    const currentUser = user[userIndex];

    // タスク追加用のアイコンとカラー候補
    const taskImages = ['🌞', '🦷', '🧼', '👕', '🍚', '🧑‍🎓', '🎒', '🚪', '🏠', '🛁', '🛏️', '📚', '🎨', '🎮', '🍽️', '🦁', '🐻', '🐼', '🐰', '🐶', '🐱'];
    const taskColors = ['#FFD700', '#00BFFF', '#FF69B4', '#90EE90', '#FFA500', '#FF6347', '#8A2BE2', '#00CED1', '#FFB6C1', '#A9A9A9'];

    // タスク追加モーダルの状態
    const [modalVisible, setModalVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [selectedImage, setSelectedImage] = useState(taskImages[0]);
    const [selectedColor, setSelectedColor] = useState(taskColors[0]);
    const [targetListIdx, setTargetListIdx] = useState<number | null>(null);

    // 編集用モーダル状態
    const [editListIdx, setEditListIdx] = useState<number | null>(null);
    const [editListName, setEditListName] = useState('');
    const [editTaskInfo, setEditTaskInfo] = useState<{ listIdx: number; taskIdx: number; task: any } | null>(null);

    // タスクリスト追加ハンドラ
    const handleAddTaskList = useCallback(() => {
        if (!currentUser) return;
        if (currentUser.taskLists.length >= 3) {
            Alert.alert('タスクリストは最大3つまでです');
            return;
        }
        // 仮のリスト名（本来はモーダルで入力）
        addTaskList(userIndex, `新しいリスト${currentUser.taskLists.length + 1}`);
    }, [currentUser, userIndex, addTaskList]);

    // タスク追加ハンドラ（モーダルを開く）
    const handleOpenAddTaskModal = useCallback((listIdx: number) => {
        setTargetListIdx(listIdx);
        setNewTaskName('');
        setSelectedImage(taskImages[0]);
        setSelectedColor(taskColors[0]);
        setModalVisible(true);
    }, []);

    // タスク登録処理
    const handleRegisterTask = useCallback(() => {
        if (!currentUser || targetListIdx === null) return;
        if (!newTaskName.trim()) {
            Alert.alert('タスク名を入力してください');
            return;
        }
        addTask(userIndex, targetListIdx, {
            title: newTaskName.trim(),
            image: selectedImage,
            color: selectedColor,
        });
        setModalVisible(false);
    }, [currentUser, userIndex, addTask, newTaskName, selectedImage, selectedColor, targetListIdx]);

    // タスクリスト編集開始
    const handleOpenEditListModal = (listIdx: number, currentName: string) => {
        setEditListIdx(listIdx);
        setEditListName(currentName);
    };
    // タスクリスト編集確定
    const handleEditListName = () => {
        if (currentUser && editListIdx !== null && editListName.trim()) {
            editTaskListName(userIndex, editListIdx, editListName.trim());
        }
        setEditListIdx(null);
        setEditListName('');
    };
    // タスクリスト削除
    const handleDeleteList = (listIdx: number) => {
        Alert.alert('確認', 'このタスクリストを削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            { text: '削除', style: 'destructive', onPress: () => deleteTaskList(userIndex, listIdx) },
        ]);
    };
    // タスク編集開始
    const handleOpenEditTaskModal = (listIdx: number, taskIdx: number, task: any) => {
        setEditTaskInfo({ listIdx, taskIdx, task });
        setNewTaskName(task.title);
        setSelectedImage(task.image);
        setSelectedColor(task.color);
        setModalVisible(true);
    };
    // タスク編集確定
    const handleEditTask = () => {
        if (!currentUser || !editTaskInfo) return;
        if (!newTaskName.trim()) {
            Alert.alert('タスク名を入力してください');
            return;
        }
        editTask(userIndex, editTaskInfo.listIdx, editTaskInfo.taskIdx, {
            title: newTaskName.trim(),
            image: selectedImage,
            color: selectedColor,
        });
        setModalVisible(false);
        setEditTaskInfo(null);
    };
    // タスク削除
    const handleDeleteTask = (listIdx: number, taskIdx: number) => {
        Alert.alert('確認', 'このタスクを削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            { text: '削除', style: 'destructive', onPress: () => deleteTask(userIndex, listIdx, taskIdx) },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: currentUser?.name || 'ユーザー詳細',
                    headerBackTitle: '戻る',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/`);
                            }}
                        >
                            <Text>戻る</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            {currentUser ? (
                <>
                    <Text style={styles.title}>{currentUser.name} のタスクリスト</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddTaskList}>
                        <Text style={styles.addBtnText}>＋ タスクリスト追加</Text>
                    </TouchableOpacity>
                    <View style={styles.taskList}>
                        {currentUser.taskLists.map((list, listIdx) => (
                            <View key={listIdx} style={{ marginBottom: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                    <Text style={styles.taskListName}>{list.name}</Text>
                                    {/* タスクリスト編集・削除ボタン */}
                                    <TouchableOpacity onPress={() => handleOpenEditListModal(listIdx, list.name)} style={{ marginLeft: 8 }}>
                                        <Ionicons name="pencil" size={18} color="#007AFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteList(listIdx)} style={{ marginLeft: 4 }}>
                                        <Ionicons name="trash" size={18} color="#f44" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.taskList}>
                                    {list.tasks.map((task, taskIdx) => (
                                        <View key={taskIdx} style={[styles.taskItem, { flexDirection: 'row', alignItems: 'center' }]}> 
                                            <Text style={styles.taskImage}>{task.image}</Text>
                                            <Text style={styles.taskTitle}>{task.title}</Text>
                                            {/* タスク編集・削除ボタン */}
                                            <TouchableOpacity onPress={() => handleOpenEditTaskModal(listIdx, taskIdx, task)} style={{ marginLeft: 8 }}>
                                                <Ionicons name="pencil" size={16} color="#007AFF" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDeleteTask(listIdx, taskIdx)} style={{ marginLeft: 4 }}>
                                                <Ionicons name="trash" size={16} color="#f44" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.addBtn} onPress={() => handleOpenAddTaskModal(listIdx)}>
                                    <Text style={styles.addBtnText}>＋ タスク追加</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {/* タスクリスト名編集モーダル */}
                    <Modal visible={editListIdx !== null} transparent animationType="fade">
                        <View style={styles.modalOverlay}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.modalTitle}>リスト名を編集</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editListName}
                                    onChangeText={setEditListName}
                                    placeholder="リスト名"
                                />
                                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                    <TouchableOpacity style={styles.modalBtn} onPress={handleEditListName}>
                                        <Text style={{ color: '#fff' }}>保存</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#aaa' }]} onPress={() => setEditListIdx(null)}>
                                        <Text style={{ color: '#fff' }}>キャンセル</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                    {/* タスク追加・編集モーダル（共通） */}
                    <Modal visible={modalVisible} transparent animationType="slide">
                        <View style={styles.modalOverlay}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.modalTitle}>{editTaskInfo ? 'タスクを編集' : 'タスクを追加'}</Text>
                                {/* タスク名入力 */}
                                <TextInput
                                    style={styles.input}
                                    placeholder="タスク名"
                                    value={newTaskName}
                                    onChangeText={setNewTaskName}
                                />
                                {/* アイコン選択 */}
                                <Text style={styles.modalTitle}>アイコン</Text>
                                <View  style={styles.modalWrap}>
                                    {taskImages.map((img) => (
                                        <TouchableOpacity
                                            key={img}
                                            style={[styles.iconButton, selectedImage === img && styles.iconButtonSelected]}
                                            onPress={() => setSelectedImage(img)}
                                        >
                                            <Text style={styles.iconText}>{img}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {/* 色選択 */}
                                <Text style={styles.modalTitle}>色</Text>
                                <View  style={styles.modalWrap}>
                                    {taskColors.map((color) => (
                                        <TouchableOpacity
                                            key={color}
                                            style={[styles.colorButton, { backgroundColor: color }, selectedColor === color && styles.colorButtonSelected]}
                                            onPress={() => setSelectedColor(color)}
                                        />
                                    ))}
                                </View>
                                {/* ボタン */}
                                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                    <TouchableOpacity style={styles.modalBtn} onPress={editTaskInfo ? handleEditTask : handleRegisterTask}>
                                        <Text style={{ color: '#fff' }}>{editTaskInfo ? '保存' : '追加'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#aaa' }]} onPress={() => { setModalVisible(false); setEditTaskInfo(null); }}>
                                        <Text style={{ color: '#fff' }}>キャンセル</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </>
            ) : (
                <Text style={styles.errorText}>ユーザーが見つかりません</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: 200,
        marginTop: 8,
        fontSize: 16,
    },
    modalBtn: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 8,
    },
    iconButton: {
        padding: 6,
        marginRight: 6,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f4ff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 36,
        minHeight: 36,
    },
    iconButtonSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#c7d2fe',
    },
    iconText: {
        fontSize: 20,
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
    modalWrap: {
        marginVertical: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
});

export default UserDetailScreen;
