import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Member = {
  name: string;
  tasks: string[];
};

interface UserContextType {
  members: Member[];
  selectedUserIndex: number;
  addMember: (name: string) => void;
  selectUser: (index: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<Member[]>([
    { name: 'ユーザー1', tasks: ['タスクA', 'タスクB'] },
    { name: 'ユーザー2', tasks: ['タスクC'] },
  ]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

  const addMember = (name: string) => {
    setMembers((prev) => [...prev, { name, tasks: [] }]);
  };
  const selectUser = (index: number) => {
    setSelectedUserIndex(index);
  };

  return (
    <UserContext.Provider value={{ members, selectedUserIndex, addMember, selectUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};
