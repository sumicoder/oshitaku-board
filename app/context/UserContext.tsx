import React, { createContext, ReactNode, useContext, useState } from 'react';

// タスク型
export type Task = {
    title: string;
    image: string;
    color: string;
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
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [members, setMembers] = useState<Member[]>([
        {
            id: '1',
            name: 'ユーザー1',
            taskLists: [
                {
                    id: '1',
                    name: '朝の準備',
                    tasks: [
                        { title: 'おきた', image: '🌞', color: '#FFD700' },
                        { title: 'うがいをする', image: '🦷', color: '#00BFFF' },
                    ],
                },
                {
                    id: '2',
                    name: '夜の準備',
                    tasks: [
                        { title: 'おやすみ', image: '🌙', color: '#FFD700' },
                        { title: 'うがい', image: '🦷', color: '#00BFFF' },
                    ],
                },
            ],
        },
        {
            id: '2',
            name: 'ユーザー2',
            taskLists: [
                {
                    id: '3',
                    name: '朝の準備',
                    tasks: [
                        { title: 'おきた', image: '🌞', color: '#FFD700' },
                        { title: 'うがいをする', image: '🦷', color: '#00BFFF' },
                    ],
                },
            ],
        },
    ]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);

    const addMember = (name: string) => {
        setMembers((prev) => [...prev, { id: String(members.length + 1), name, taskLists: [] }]);
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
                          taskLists: m.taskLists.map((l, lidx) =>
                              lidx === listIdx ? { ...l, name: newName } : l
                          ),
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
                                        tasks: l.tasks.map((t, tidx) =>
                                            tidx === taskIdx ? { ...t, ...newTask } : t
                                        ),
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
