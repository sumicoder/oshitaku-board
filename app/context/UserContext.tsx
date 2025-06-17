import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { initialTaskLists } from '../data/taskInitialData';

// タスク型
export type Task = {
    id: string;
    title: string;
    image: Icon;
    done: boolean;
};

// タスクリスト型
export type TaskList = {
    id: string;
    name: string;
    tasks: Task[];
};

// アイコン型
export type Icon = {
    name: string;
    type: string;
};

// ユーザー型
export type User = {
    id: string;
    name: string;
    taskLists: TaskList[];
    color: string;
};

// 色リスト
export const colorList = ['#FFD700', '#00BFFF', '#FF69B4', '#90EE90', '#FFA500', '#FF6347', '#8A2BE2', '#00CED1', '#FFB6C1', '#A9A9A9'];
// 汎用的なアイコン30種類のリスト
export const iconList = [
    { name: 'home', type: 'AntDesign' },
    { name: 'user', type: 'AntDesign' },
    { name: 'star', type: 'AntDesign' },
    { name: 'checkcircle', type: 'AntDesign' },
    { name: 'smileo', type: 'AntDesign' },
    { name: 'coffee', type: 'FontAwesome' },
    { name: 'bath', type: 'FontAwesome' },
    { name: 'book', type: 'FontAwesome' },
    { name: 'palette', type: 'MaterialIcons' },
    { name: 'videogame-asset', type: 'MaterialIcons' },
    { name: 'shopping-cart', type: 'Feather' },
    { name: 'calendar', type: 'Feather' },
    { name: 'bell', type: 'Feather' },
    { name: 'camera', type: 'Feather' },
    { name: 'music', type: 'Feather' },
    { name: 'gift', type: 'Feather' },
    { name: 'heart', type: 'FontAwesome' },
    { name: 'car', type: 'FontAwesome' },
    { name: 'cutlery', type: 'FontAwesome' },
    { name: 'paw', type: 'FontAwesome' },
    { name: 'bicycle', type: 'FontAwesome' },
    { name: 'umbrella', type: 'FontAwesome' },
    { name: 'leaf', type: 'FontAwesome' },
    { name: 'plane', type: 'FontAwesome' },
    { name: 'sun', type: 'Feather' },
    { name: 'moon', type: 'Feather' },
    { name: 'cloud', type: 'Feather' },
    { name: 'map', type: 'Feather' },
    { name: 'key', type: 'Feather' },
    { name: 'lock', type: 'Feather' },
];

type UserContextType = {
    users: User[];
    selectedUserId: string | null;
    addUser: (name: string, color: string) => void;
    selectUser: (userId: string) => void;
    addTaskList: (userId: string, listName: string) => void;
    addTask: (userId: string, listId: string, task: Task) => void;
    editTaskListName: (userId: string, listId: string, newName: string) => void;
    deleteTaskList: (userId: string, listId: string) => void;
    editTask: (userId: string, listId: string, taskId: string, newTask: Task) => void;
    deleteTask: (userId: string, listId: string, taskId: string) => void;
    toggleTaskDone: (userId: string, listId: string, taskId: string) => void;
    editUser: (userId: string, newName: string, newColor: string) => void;
    deleteUser: (userId: string) => void;
    moveUser: (userId: string, toIndex: number) => void;
    setUsersOrder: (newOrder: User[]) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // 初回マウント時にストレージから復元
    useEffect(() => {
        (async () => {
            const usersData = await AsyncStorage.getItem('users');
            const selectedUserIdData = await AsyncStorage.getItem('selectedUserId');
            if (usersData) {
                setUsers(JSON.parse(usersData));
            } else {
                setUsers([
                    { id: '0', name: 'ユーザー1', taskLists: initialTaskLists, color: '#FFD700' },
                    { id: '1', name: 'ユーザー2', taskLists: initialTaskLists, color: '#00BFFF' },
                ]);
            }
            if (selectedUserIdData) {
                setSelectedUserId(selectedUserIdData);
            } else {
                setSelectedUserId('0'); // デフォルトで最初のユーザー
            }
            setLoading(false);
        })();
    }, []);

    // 変更時に保存
    useEffect(() => {
        if (!loading) AsyncStorage.setItem('users', JSON.stringify(users));
    }, [users, loading]);
    useEffect(() => {
        if (!loading && selectedUserId !== null) AsyncStorage.setItem('selectedUserId', String(selectedUserId));
    }, [selectedUserId, loading]);

    // アプリがアクティブになった時に日付を比較し、異なれば全タスクdoneをfalseにリセット
    useEffect(() => {
        const handleAppStateChange = async (nextAppState: string) => {
            if (nextAppState === 'active') {
                try {
                    // ストレージから前回保存日付を取得
                    const lastDate = await AsyncStorage.getItem('lastCheckedDate');
                    // 今日の日付（YYYY-MM-DD）
                    const today = new Date().toISOString().slice(0, 10);
                    if (lastDate === null || lastDate !== today) {
                        // 日付が異なれば全タスクdoneをfalseにリセット
                        setUsers((prev) =>
                            prev.map((u) => ({
                                ...u,
                                taskLists: u.taskLists.map((l) => ({
                                    ...l,
                                    tasks: l.tasks.map((t) => ({ ...t, done: false })),
                                })),
                            }))
                        );
                        // 日付をストレージに保存
                        await AsyncStorage.setItem('lastCheckedDate', today);
                    }
                } catch (e) {
                    console.error('日付チェック・リセットエラー', e);
                }
            }
        };
        // AppStateの監視
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        // 初回マウント時にも一度チェック
        handleAppStateChange('active');
        return () => {
            subscription?.remove();
        };
    }, []);

    // ユーザー追加
    const addUser = (name: string, color: string) => {
        setUsers((prev) => {
            // idは一意なランダム値
            const newId = Math.random().toString(36).substring(2, 15);
            return [...prev, { id: newId, name, taskLists: initialTaskLists, color }];
        });
    };
    // ユーザー選択
    const selectUser = (userId: string) => {
        setSelectedUserId(userId);
    };

    // タスクリスト追加
    const addTaskList = (userId: string, listName: string) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === userId && u.taskLists.length < 3 ? { ...u, taskLists: [...u.taskLists, { id: Math.random().toString(36).substring(2, 15), name: listName, tasks: [] }] } : u))
        );
    };

    // タスク追加
    const addTask = (userId: string, listId: string, task: Task) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? {
                          ...u,
                          taskLists: u.taskLists.map((l) => (l.id === listId ? { ...l, tasks: [...l.tasks, { ...task, id: Math.random().toString(36).substring(2, 15) }] } : l)),
                      }
                    : u
            )
        );
    };

    // タスクリスト名編集
    const editTaskListName = (userId: string, listId: string, newName: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? {
                          ...u,
                          taskLists: u.taskLists.map((l) => (l.id === listId ? { ...l, name: newName } : l)),
                      }
                    : u
            )
        );
    };

    // タスクリスト削除
    const deleteTaskList = (userId: string, listId: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? {
                          ...u,
                          taskLists: u.taskLists.filter((l) => l.id !== listId),
                      }
                    : u
            )
        );
    };

    // タスク編集
    const editTask = (userId: string, listId: string, taskId: string, newTask: Task) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? {
                          ...u,
                          taskLists: u.taskLists.map((l) => (l.id === listId ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, ...newTask } : t)) } : l)),
                      }
                    : u
            )
        );
    };

    // タスク削除
    const deleteTask = (userId: string, listId: string, taskId: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? {
                          ...u,
                          taskLists: u.taskLists.map((l) => (l.id === listId ? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) } : l)),
                      }
                    : u
            )
        );
    };

    // タスク完了トグル
    const toggleTaskDone = (userId: string, listId: string, taskId: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? {
                          ...u,
                          taskLists: u.taskLists.map((l) => (l.id === listId ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) } : l)),
                      }
                    : u
            )
        );
    };

    // ユーザー名・色編集
    const editUser = (userId: string, newName: string, newColor: string) => {
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, name: newName, color: newColor } : u)));
    };

    // ユーザー削除
    const deleteUser = (userId: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setSelectedUserId((prevId) => {
            if (prevId === userId) {
                // 削除したユーザーが選択中なら先頭ユーザーに切り替え
                const next = users.find((u) => u.id !== userId);
                return next ? next.id : null;
            }
            return prevId;
        });
    };

    // ユーザー並べ替え
    const moveUser = (userId: string, toIndex: number) => {
        setUsers((prev) => {
            const idx = prev.findIndex((u) => u.id === userId);
            if (idx === -1 || toIndex < 0 || toIndex >= prev.length) return prev;
            const newArr = [...prev];
            const [removed] = newArr.splice(idx, 1);
            newArr.splice(toIndex, 0, removed);
            return newArr;
        });
    };

    // ユーザー順を一括更新（ドラッグ&ドロップ用）
    const setUsersOrder = (newOrder: User[]) => {
        setUsers(newOrder);
    };

    if (loading) return null; // ローディングUI推奨

    return (
        <UserContext.Provider
            value={{
                users,
                selectedUserId,
                addUser,
                selectUser,
                addTaskList,
                addTask,
                editTaskListName,
                deleteTaskList,
                editTask,
                deleteTask,
                toggleTaskDone,
                editUser,
                deleteUser,
                moveUser,
                setUsersOrder,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUserContext must be used within UserProvider');
    return ctx;
};

export default UserProvider;
