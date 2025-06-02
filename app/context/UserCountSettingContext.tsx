import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UserCountSettingContextType {
    userCount: number;
    setUserCount: (n: number) => void;
    // 今後追加したいユーザー設定項目もここに追加
    // 例: userTheme: string; setUserTheme: (t: string) => void;
}

const UserCountSettingContext = createContext<UserCountSettingContextType | undefined>(undefined);

export const UserCountSettingProvider = ({ children }: { children: ReactNode }) => {
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
        <UserCountSettingContext.Provider
            value={{
                userCount,
                setUserCount,
                // userTheme, setUserTheme
            }}
        >
            {children}
        </UserCountSettingContext.Provider>
    );
};

export const useUserCountSetting = () => {
    const ctx = useContext(UserCountSettingContext);
    if (!ctx) throw new Error('useUserCountSetting must be used within UserCountSettingProvider');
    return ctx;
};

export default UserCountSettingProvider;
