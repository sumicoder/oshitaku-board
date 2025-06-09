import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ProgressBarSettingContextType {
    isProgressBarVisible: boolean;
    setIsProgressBarVisible: (v: boolean) => void;
}

const ProgressBarSettingContext = createContext<ProgressBarSettingContextType | undefined>(undefined);

export const ProgressBarSettingProvider = ({ children }: { children: ReactNode }) => {
    const [isProgressBarVisible, setIsProgressBarVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await AsyncStorage.getItem('progressBarSettings');
            if (data) setIsProgressBarVisible(data === 'true');
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!loading) AsyncStorage.setItem('progressBarSettings', String(isProgressBarVisible));
    }, [isProgressBarVisible, loading]);

    if (loading) return null;

    return (
        <ProgressBarSettingContext.Provider
            value={{
                isProgressBarVisible,
                setIsProgressBarVisible,
            }}
        >
            {children}
        </ProgressBarSettingContext.Provider>
    );
};

export const useProgressBarSetting = () => {
    const ctx = useContext(ProgressBarSettingContext);
    if (!ctx) throw new Error('useProgressBarSetting must be used within ProgressBarSettingProvider');
    return ctx;
};

export default ProgressBarSettingProvider;
