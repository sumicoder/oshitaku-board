import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TaskItem from '../../components/TaskItem';
import { colorList, iconList, useUserContext } from '../../context/UserContext';

// ユーザー詳細ページのコンポーネント
const UserDetailScreen = () => {
    // expo-routerからuserIdを取得
    const { userId } = useLocalSearchParams();

    // Contextからユーザー情報・タスクリスト並び替え関数を取得
    const { users, addTaskList, addTask, editTaskListName, deleteTaskList, editTask, deleteTask, editUser, deleteUser } = useUserContext();

    // userId（string）で一致するユーザーを検索
    const currentUser = users.find((u) => u.id === userId);

    useEffect(() => {
        if (!currentUser) {
            router.push('/');
        }
    }, [currentUser]);

    // ユーザー名編集用の状態
    const [newEditUserName, setNewEditUserName] = useState(currentUser?.name || '');

    // タスク追加モーダルの状態
    const [modalVisible, setModalVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [selectedImage, setSelectedImage] = useState(iconList[0]);
    const [selectedColor, setSelectedColor] = useState(currentUser?.color || '#fff');
    const [targetListIdx, setTargetListIdx] = useState<string | null>(null);

    // 編集用モーダル状態
    const [editListId, setEditListId] = useState<string | null>(null);
    const [editListName, setEditListName] = useState('');
    const [editTaskInfo, setEditTaskInfo] = useState<{ listId: string; taskIdx: number; task: any } | null>(null);

    // タブUIの状態
    const [selectedTab, setSelectedTab] = useState<string>(currentUser?.taskLists[0]?.id || '');

    // userIdやcurrentUserが変わった時に、編集用のstateを新しいユーザー情報で初期化する
    useEffect(() => {
        // currentUserが変わった時に編集用stateを初期化
        setNewEditUserName(currentUser?.name || '');
        setSelectedColor(currentUser?.color || '#fff');
        setSelectedTab(currentUser?.taskLists[0]?.id || '');
        // 必要なら他のstateもリセット
        setModalVisible(false);
        setEditListId(null);
        setEditListName('');
        setEditTaskInfo(null);
        setNewTaskName('');
        setSelectedImage(iconList[0]);
        setTargetListIdx(null);
    }, [userId, currentUser]);

    // タスクリスト追加ハンドラ
    const handleAddTaskList = useCallback(() => {
        if (!currentUser) return;
        if (currentUser.taskLists.length >= 3) {
            Alert.alert('タスクリストは最大3つまでです');
            return;
        }
        // 仮のリスト名（本来はモーダルで入力）
        addTaskList(currentUser.id, `新しいリスト${currentUser.taskLists.length + 1}`);
    }, [currentUser, addTaskList]);

    // タスク追加ハンドラ（モーダルを開く）
    const handleOpenAddTaskModal = useCallback((listId: string) => {
        setTargetListIdx(listId);
        setNewTaskName('');
        setSelectedImage(iconList[0]);
        setModalVisible(true);
    }, []);

    // タスク登録処理
    const handleRegisterTask = useCallback(() => {
        if (!currentUser || targetListIdx === null) return;
        if (!newTaskName.trim()) {
            Alert.alert('タスク名を入力してください');
            return;
        }
        addTask(currentUser?.id || '', targetListIdx.toString(), {
            id: Math.random().toString(36).substring(2, 15),
            title: newTaskName.trim(),
            image: selectedImage,
            done: false,
        });
        setModalVisible(false);
    }, [currentUser, addTask, newTaskName, selectedImage, targetListIdx]);

    // タスクリスト編集開始
    const handleOpenEditListModal = (listId: string, currentName: string) => {
        setEditListId(listId);
        setEditListName(currentName);
    };
    // タスクリスト編集確定
    const handleEditListName = () => {
        if (currentUser && editListId !== null && editListName.trim()) {
            editTaskListName(currentUser?.id || '', editListId, editListName.trim());
        }
        setEditListId(null);
        setEditListName('');
    };
    // タスクリスト削除
    const handleDeleteList = (listId: string) => {
        Alert.alert('確認', 'このタスクリストを削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            { text: '削除', style: 'destructive', onPress: () => deleteTaskList(currentUser?.id || '', listId) },
        ]);
    };
    // タスク編集開始
    const handleOpenEditTaskModal = (listId: string, taskIdx: number, task: any) => {
        setEditTaskInfo({ listId, taskIdx, task });
        setNewTaskName(task.title);
        setSelectedImage(task.image);
        setModalVisible(true);
    };
    // タスク編集確定
    const handleEditTask = () => {
        if (!currentUser || !editTaskInfo) return;
        if (!newTaskName.trim()) {
            Alert.alert('タスク名を入力してください');
            return;
        }
        editTask(currentUser?.id || '', editTaskInfo.listId, editTaskInfo.task.id, {
            id: editTaskInfo.task.id,
            title: newTaskName.trim(),
            image: selectedImage,
            done: false,
        });
        setModalVisible(false);
        setEditTaskInfo(null);
    };
    // タスク削除
    const handleDeleteTask = (listId: string, taskIdx: string) => {
        Alert.alert('確認', 'このタスクを削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            { text: '削除', style: 'destructive', onPress: () => deleteTask(currentUser?.id || '', listId, taskIdx) },
        ]);
    };

    // ユーザー名編集確定
    const handleEditUserData = () => {
        if (currentUser && newEditUserName.trim()) {
            editUser(currentUser.id, newEditUserName.trim(), selectedColor);
        }
    };
    // 色変更
    const handleColorChange = (color: string) => {
        editUser(currentUser?.id || '', currentUser?.name || '', color);
        setSelectedColor(color);
    };
    // ユーザー削除
    const handleDeleteUser = () => {
        Alert.alert('確認', 'このユーザーを削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            { text: '削除', style: 'destructive', onPress: () => deleteUser(currentUser?.id || '') },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: currentUser?.name || 'ユーザー詳細',
                    headerBackTitle: '戻る',
                    headerTitleStyle: {
                        fontSize: 24,
                        color: currentUser?.color || '#fff',
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push('/');
                            }}
                            style={{ marginLeft: 32, backgroundColor: currentUser?.color || '#fff', padding: 8 }}
                        >
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>戻る</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            {currentUser && (
                <View style={{ flex: 1, flexDirection: 'row', gap: 40 }}>
                    <View style={{ flex: 0.4 }}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>ユーザー名を編集</Text>
                            <TextInput style={styles.input} value={newEditUserName} onChangeText={setNewEditUserName} placeholder="ユーザー名" />
                            <Text style={styles.title}>色を選択</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                {colorList.map((color) => (
                                    <TouchableOpacity
                                        key={color}
                                        style={[styles.colorButton, { backgroundColor: color }, selectedColor === color && styles.colorButtonSelected]}
                                        onPress={() => handleColorChange(color)}
                                    />
                                ))}
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 40 }}>
                                <TouchableOpacity style={styles.modalBtn} onPress={handleEditUserData}>
                                    <Text style={{ color: '#fff', fontSize: 20 }}>保存</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 16 }}>
                                <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteUser}>
                                    <Text style={{ color: '#fff', fontSize: 20 }}>ユーザーを削除</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.title}>{currentUser.name} のタスクリスト</Text>
                        <View style={styles.tabContainer}>
                            <ScrollView horizontal contentContainerStyle={styles.tabScroll}>
                                {currentUser.taskLists.map((list) => (
                                    <View key={list.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={[styles.tab, { borderBottomColor: selectedTab === list.id ? currentUser.color : 'transparent' }]}
                                            onPress={() => setSelectedTab(list.id)}
                                        >
                                            <Text style={[styles.tabText, { fontWeight: selectedTab === list.id ? 'bold' : 'normal', color: selectedTab === list.id ? currentUser.color : '#333' }]}>
                                                {list.name}
                                            </Text>
                                        </TouchableOpacity>
                                        {/* タスクリスト編集・削除ボタン */}
                                        <TouchableOpacity onPress={() => handleOpenEditListModal(list.id, list.name)} style={{ marginLeft: 4 }}>
                                            <Ionicons name="pencil" size={24} color={'#333'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteList(list.id)} style={{ marginLeft: 2 }}>
                                            <Ionicons name="trash" size={24} color="#f44" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                {currentUser.taskLists.length < 3 && (
                                    <View style={{ marginLeft: 40 }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleAddTaskList()}>
                                            <Ionicons name="add" size={24} color={'#333'} />
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>タスクリストを追加</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                        {/* タスク追加ボタン */}
                        <TouchableOpacity style={[styles.addBtn, { backgroundColor: currentUser?.color || '#007AFF' }]} onPress={() => handleOpenAddTaskModal(selectedTab || '')}>
                            <Text style={styles.addBtnText}>＋ タスク追加</Text>
                        </TouchableOpacity>
                        {/* タスク一覧（TaskItemで表示） */}
                        <View style={styles.taskList}>
                            {currentUser.taskLists.find((list) => list.id === selectedTab)?.tasks.length === 0 ? (
                                <Text style={styles.noTask}>タスクなし</Text>
                            ) : (
                                currentUser.taskLists
                                    .find((list) => list.id === selectedTab)
                                    ?.tasks.map((task, taskIdx) => (
                                        <View key={taskIdx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                            <TaskItem
                                                task={task}
                                                currentUser={currentUser}
                                                style={{ flex: 1, borderWidth: 1, marginRight: 24 }}
                                                onPress={() => handleOpenEditTaskModal(selectedTab || '', taskIdx, task)}
                                                editMode={true}
                                            />
                                            {/* 削除ボタン */}
                                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => handleDeleteTask(selectedTab || '', task.id)}>
                                                <Ionicons name="trash" size={40} color="#f44" />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                            )}
                        </View>
                        {/* タスクリスト名編集モーダル */}
                        <Modal visible={editListId !== null} transparent animationType="fade">
                            <View style={styles.modalOverlay}>
                                <ScrollView contentContainerStyle={styles.modalContent}>
                                    <Text style={styles.title}>リスト名を編集</Text>
                                    <TextInput style={styles.input} value={editListName} onChangeText={setEditListName} placeholder="リスト名" />
                                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                        <TouchableOpacity style={styles.modalBtn} onPress={handleEditListName}>
                                            <Text style={{ color: '#fff', fontSize: 20 }}>保存</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#aaa' }]} onPress={() => setEditListId(null)}>
                                            <Text style={{ color: '#fff', fontSize: 20 }}>キャンセル</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>
                        {/* タスク追加・編集モーダル（共通） */}
                        <Modal visible={modalVisible} transparent animationType="slide">
                            <View style={styles.modalOverlay}>
                                <ScrollView contentContainerStyle={styles.modalContent}>
                                    <Text style={styles.title}>{editTaskInfo ? 'タスクを編集' : 'タスクを追加'}</Text>
                                    {/* タスク名入力 */}
                                    <TextInput style={styles.input} placeholder="タスク名" value={newTaskName} onChangeText={setNewTaskName} />
                                    {/* アイコン選択 */}
                                    <Text style={styles.title}>アイコン</Text>
                                    <View style={styles.modalWrap}>
                                        {iconList.map((img) => (
                                            <TouchableOpacity key={img} style={[styles.iconButton, selectedImage === img && styles.iconButtonSelected]} onPress={() => setSelectedImage(img)}>
                                                <Text style={styles.iconText}>{img}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    {/* ボタン */}
                                    <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                        <TouchableOpacity style={styles.modalBtn} onPress={editTaskInfo ? handleEditTask : handleRegisterTask}>
                                            <Text style={{ color: '#fff', fontSize: 20 }}>{editTaskInfo ? '保存' : '追加'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.modalBtn, { backgroundColor: '#aaa' }]}
                                            onPress={() => {
                                                setModalVisible(false);
                                                setEditTaskInfo(null);
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 20 }}>キャンセル</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>
                    </View>
                </View>
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
        marginVertical: 16,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100,
        marginHorizontal: 'auto',
        width: '100%',
        maxWidth: 400,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        width: 300,
        marginTop: 8,
        fontSize: 24,
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
        marginHorizontal: 2,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f4ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButtonSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#c7d2fe',
    },
    iconText: {
        fontSize: 40,
    },
    colorButton: {
        width: 56,
        height: 56,
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
        gap: 6,
    },
    deleteBtn: {
        backgroundColor: '#f44',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    tabContainer: {
        marginBottom: 16,
        borderBottomWidth: 2,
        borderColor: '#ccc',
    },
    tabScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
    },
    tab: {
        padding: 8,
        marginRight: 8,
    },
    tabText: {
        fontSize: 16,
    },
    noTask: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
    },
});

export default UserDetailScreen;
