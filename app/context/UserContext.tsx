import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { initialTaskLists } from '../data/taskInitialData';

// タスク型
export type Task = {
    id: string;
    title: string;
    image: string;
    done: boolean;
};

// タスクリスト型
export type TaskList = {
    id: string;
    name: string;
    tasks: Task[];
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
// アイコンリスト
export const iconList = ['🌞', '🦷', '🧼', '👕', '🍚', '🧑‍🎓', '🎒', '🚪', '🏠', '🛁', '🛏️', '📚', '🎨', '🎮', '🍽️', '🦁', '🐻', '🐼', '🐰', '🐶', '🐱'];

type UserContextType = {
    users: User[];
    selectedUserIndex: number;
    addUser: (name: string, color: string) => void;
    selectUser: (index: number) => void;
    addTaskList: (userIdx: number, listName: string) => void;
    addTask: (userIdx: number, listIdx: number, task: Task) => void;
    editTaskListName: (userIdx: number, listIdx: number, newName: string) => void;
    deleteTaskList: (userIdx: number, listIdx: number) => void;
    editTask: (userIdx: number, listIdx: number, taskIdx: string, newTask: Task) => void;
    deleteTask: (userIdx: number, listIdx: number, taskIdx: string) => void;
    toggleTaskDone: (userIdx: number, listIdx: number, taskIdx: string) => void;
    editUser: (userIdx: number, newName: string, newColor: string) => void;
    deleteUser: (userIdx: number) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, serUser] = useState<User[]>([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // 初回マウント時にストレージから復元
    useEffect(() => {
        (async () => {
            const usersData = await AsyncStorage.getItem('users');
            const selectedUserIndexData = await AsyncStorage.getItem('selectedUserIndex');
            if (usersData) {
                serUser(JSON.parse(usersData));
            } else {
                serUser([
                    { id: '0', name: 'ユーザー1', taskLists: initialTaskLists, color: '#FFD700' },
                    { id: '1', name: 'ユーザー2', taskLists: initialTaskLists, color: '#00BFFF' },
                ]);
            }
            if (selectedUserIndexData) {
                setSelectedUserIndex(Number(selectedUserIndexData));
            }
            setLoading(false);
        })();
    }, []);

    // 変更時に保存
    useEffect(() => {
        if (!loading) AsyncStorage.setItem('users', JSON.stringify(users));
    }, [users, loading]);
    useEffect(() => {
        if (!loading) AsyncStorage.setItem('selectedUserIndex', String(selectedUserIndex));
    }, [selectedUserIndex, loading]);

    const addUser = (name: string, color: string) => {
        serUser((prev) => [...prev, { id: String(prev.length + 1), name, taskLists: initialTaskLists, color }]);
    };
    const selectUser = (index: number) => {
        setSelectedUserIndex(index);
    };

    // タスクリスト追加
    const addTaskList = (userIdx: number, listName: string) => {
        serUser((prev) => {
            const next = prev.map((m, idx) =>
                idx === userIdx && m.taskLists.length < 3 ? { ...m, taskLists: [...m.taskLists, { id: String(m.taskLists.length + 1), name: listName, tasks: [] }] } : m
            );
            return next;
        });
    };

    // タスク追加
    const addTask = (userIdx: number, listIdx: number, task: Task) => {
        serUser((prev) => {
            const next = prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) => (lidx === listIdx ? { ...l, tasks: [...l.tasks, { ...task, id: Math.random().toString(36).substring(2, 15) }] } : l)),
                      }
                    : m
            );
            return next;
        });
    };

    // タスクリスト名編集
    const editTaskListName = (userIdx: number, listIdx: number, newName: string) => {
        serUser((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) => (lidx === listIdx ? { ...l, name: newName } : l)),
                      }
                    : m
            )
        );
    };

    // タスクリスト削除
    const deleteTaskList = (userIdx: number, listIdx: number) => {
        serUser((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.filter((_, lidx) => lidx !== listIdx),
                      }
                    : m
            )
        );
    };

    // タスク編集
    const editTask = (userIdx: number, listIdx: number, taskIdx: string, newTask: Task) => {
        serUser((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx
                                  ? {
                                        ...l,
                                        tasks: l.tasks.map((t) => (t.id === taskIdx ? { ...t, ...newTask } : t)),
                                    }
                                  : l
                          ),
                      }
                    : m
            )
        );
    };

    // タスク削除
    const deleteTask = (userIdx: number, listIdx: number, taskIdx: string) => {
        serUser((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx
                                  ? {
                                        ...l,
                                        tasks: l.tasks.filter((t) => t.id !== taskIdx),
                                    }
                                  : l
                          ),
                      }
                    : m
            )
        );
    };

    const toggleTaskDone = (userIdx: number, listIdx: number, taskIdx: string) => {
        serUser((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx
                                  ? {
                                        ...l,
                                        tasks: l.tasks.map((t) => (t.id === taskIdx ? { ...t, done: !t.done } : t)),
                                    }
                                  : l
                          ),
                      }
                    : m
            )
        );
    };

    // ユーザー名・色編集
    const editUser = (userIdx: number, newName: string, newColor: string) => {
        serUser((prev) => prev.map((u, idx) => (idx === userIdx ? { ...u, name: newName, color: newColor } : u)));
    };

    // ユーザー削除
    const deleteUser = (userIdx: number) => {
        serUser((prev) => prev.filter((_, idx) => idx !== userIdx));
        setSelectedUserIndex((prevIdx) => {
            if (prevIdx === userIdx) return 0;
            if (prevIdx > userIdx) return prevIdx - 1;
            return prevIdx;
        });
    };

    if (loading) return null; // ローディングUI推奨

    return (
        <UserContext.Provider
            value={{
                users,
                selectedUserIndex,
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
