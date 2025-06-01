import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type DisplayMode = 'list' | 'single';

interface TaskDisplaySettingContextType {
    displayMode: DisplayMode;
    setDisplayMode: (mode: DisplayMode) => void;
}

const TaskDisplaySettingContext = createContext<TaskDisplaySettingContextType | undefined>(undefined);

export const TaskDisplaySettingProvider = ({ children }: { children: ReactNode }) => {
    const [displayMode, setDisplayMode] = useState<DisplayMode>('list');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const mode = await AsyncStorage.getItem('taskDisplayMode');
            if (mode === 'list' || mode === 'single') setDisplayMode(mode);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!loading) AsyncStorage.setItem('taskDisplayMode', displayMode);
    }, [displayMode, loading]);

    if (loading) return null;

    return (
        <TaskDisplaySettingContext.Provider value={{ displayMode, setDisplayMode }}>
            {children}
        </TaskDisplaySettingContext.Provider>
    );
};

export const useTaskDisplaySetting = () => {
    const ctx = useContext(TaskDisplaySettingContext);
    if (!ctx) throw new Error('useTaskDisplaySetting must be used within TaskDisplaySettingProvider');
    return ctx;
};

export default TaskDisplaySettingProvider;