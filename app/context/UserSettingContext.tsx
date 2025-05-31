import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserSettingContextType {
    userCount: number;
    setUserCount: (n: number) => void;
    // 今後追加したいユーザー設定項目もここに追加
    // 例: userTheme: string; setUserTheme: (t: string) => void;
}

const UserSettingContext = createContext<UserSettingContextType | undefined>(undefined);

export const UserSettingProvider = ({ children }: { children: ReactNode }) => {
    const [userCount, setUserCount] = useState(2);

    // 今後の設定もここでuseState管理
    // const [userTheme, setUserTheme] = useState('light');

    return (
        <UserSettingContext.Provider
            value={{
                userCount,
                setUserCount,
                // userTheme, setUserTheme
            }}
        >
            {children}
        </UserSettingContext.Provider>
    );
};

export const useUserSetting = () => {
    const ctx = useContext(UserSettingContext);
    if (!ctx) throw new Error('useUserSetting must be used within UserSettingProvider');
    return ctx;
};

export default UserSettingProvider;
