import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { initialTaskLists } from '../data/taskInitialData';

// タスク型
export type Task = {
    title: string;
    image: string;
    color: string;
    done?: boolean;
};

// タスクリスト型
export type TaskList = {
    id: string;
    name: string;
    tasks: Task[];
};

// ユーザー型
export type Member = {
    id: string;
    name: string;
    taskLists: TaskList[];
};

type UserContextType = {
    members: Member[];
    selectedUserIndex: number;
    addMember: (name: string) => void;
    selectUser: (index: number) => void;
    addTaskList: (userIdx: number, listName: string) => void;
    addTask: (userIdx: number, listIdx: number, task: Task) => void;
    editTaskListName: (userIdx: number, listIdx: number, newName: string) => void;
    deleteTaskList: (userIdx: number, listIdx: number) => void;
    editTask: (userIdx: number, listIdx: number, taskIdx: number, newTask: Task) => void;
    deleteTask: (userIdx: number, listIdx: number, taskIdx: number) => void;
    toggleTaskDone: (userIdx: number, listIdx: number, taskIdx: number) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // 初回マウント時にストレージから復元
    useEffect(() => {
        (async () => {
            const membersData = await AsyncStorage.getItem('members');
            const selectedUserIndexData = await AsyncStorage.getItem('selectedUserIndex');
            if (membersData) setMembers(JSON.parse(membersData));
            else
                setMembers([
                    { id: '1', name: 'ユーザー1', taskLists: initialTaskLists },
                    { id: '2', name: 'ユーザー2', taskLists: initialTaskLists },
                ]);
            if (selectedUserIndexData) setSelectedUserIndex(Number(selectedUserIndexData));
            setLoading(false);
        })();
    }, []);

    // 変更時に保存
    useEffect(() => {
        if (!loading) AsyncStorage.setItem('members', JSON.stringify(members));
    }, [members, loading]);
    useEffect(() => {
        if (!loading) AsyncStorage.setItem('selectedUserIndex', String(selectedUserIndex));
    }, [selectedUserIndex, loading]);

    const addMember = (name: string) => {
        setMembers((prev) => [...prev, { id: String(members.length + 1), name, taskLists: initialTaskLists }]);
    };
    const selectUser = (index: number) => {
        setSelectedUserIndex(index);
    };

    // タスクリスト追加
    const addTaskList = (userIdx: number, listName: string) => {
        setMembers((prev) => {
            const next = prev.map((m, idx) =>
                idx === userIdx && m.taskLists.length < 3 ? { ...m, taskLists: [...m.taskLists, { id: String(m.taskLists.length + 1), name: listName, tasks: [] }] } : m
            );
            return next;
        });
    };

    // タスク追加
    const addTask = (userIdx: number, listIdx: number, task: Task) => {
        setMembers((prev) => {
            const next = prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) => (lidx === listIdx ? { ...l, tasks: [...l.tasks, { ...task, id: String(l.tasks.length + 1) }] } : l)),
                      }
                    : m
            );
            return next;
        });
    };

    // タスクリスト名編集
    const editTaskListName = (userIdx: number, listIdx: number, newName: string) => {
        setMembers((prev) =>
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
        setMembers((prev) =>
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
    const editTask = (userIdx: number, listIdx: number, taskIdx: number, newTask: Task) => {
        setMembers((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx
                                  ? {
                                        ...l,
                                        tasks: l.tasks.map((t, tidx) => (tidx === taskIdx ? { ...t, ...newTask } : t)),
                                    }
                                  : l
                          ),
                      }
                    : m
            )
        );
    };

    // タスク削除
    const deleteTask = (userIdx: number, listIdx: number, taskIdx: number) => {
        setMembers((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx
                                  ? {
                                        ...l,
                                        tasks: l.tasks.filter((_, tidx) => tidx !== taskIdx),
                                    }
                                  : l
                          ),
                      }
                    : m
            )
        );
    };

    const toggleTaskDone = (userIdx: number, listIdx: number, taskIdx: number) => {
        setMembers((prev) =>
            prev.map((m, idx) =>
                idx === userIdx
                    ? {
                          ...m,
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx
                                  ? {
                                        ...l,
                                        tasks: l.tasks.map((t, tidx) =>
                                            tidx === taskIdx ? { ...t, done: !t.done } : t
                                        ),
                                    }
                                  : l
                          ),
                      }
                    : m
            )
        );
    };

    if (loading) return null; // ローディングUI推奨

    return (
        <UserContext.Provider
            value={{
                members,
                selectedUserIndex,
                addMember,
                selectUser,
                addTaskList,
                addTask,
                editTaskListName,
                deleteTaskList,
                editTask,
                deleteTask,
                toggleTaskDone,
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
