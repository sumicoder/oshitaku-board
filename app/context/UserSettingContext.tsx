import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UserSettingContextType {
    userCount: number;
    setUserCount: (n: number) => void;
    // 今後追加したいユーザー設定項目もここに追加
    // 例: userTheme: string; setUserTheme: (t: string) => void;
}

const UserSettingContext = createContext<UserSettingContextType | undefined>(undefined);

export const UserSettingProvider = ({ children }: { children: ReactNode }) => {
    const [userCount, setUserCount] = useState(2);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const userCountData = await AsyncStorage.getItem('userCount');
            if (userCountData) setUserCount(Number(userCountData));
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!loading) AsyncStorage.setItem('userCount', String(userCount));
    }, [userCount, loading]);

    // 今後の設定もここでuseState管理
    // const [userTheme, setUserTheme] = useState('light');
    if (loading) return null;

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
