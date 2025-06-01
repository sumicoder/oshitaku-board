import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type DisplayMode = 'list' | 'single';

interface TaskDisplaySettingContextType {
    displayMode: DisplayMode;
    setDisplayMode: (mode: DisplayMode) => void;
    showCompleted: boolean;
    setShowCompleted: (show: boolean) => void;
}

const TaskDisplaySettingContext = createContext<TaskDisplaySettingContextType | undefined>(undefined);

export const TaskDisplaySettingProvider = ({ children }: { children: ReactNode }) => {
    const [displayMode, setDisplayMode] = useState<DisplayMode>('list');
    const [showCompleted, setShowCompleted] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const mode = await AsyncStorage.getItem('taskDisplayMode');
            const showCompletedData = await AsyncStorage.getItem('taskShowCompleted');
            if (mode === 'list' || mode === 'single') {
                setDisplayMode(mode);
            }
            if (showCompletedData === 'false') {
                setShowCompleted(false);
            } else {
                setShowCompleted(true);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!loading) {
            AsyncStorage.setItem('taskDisplayMode', displayMode);
        }
    }, [displayMode, loading]);

    useEffect(() => {
        if (!loading) {
            AsyncStorage.setItem('taskShowCompleted', String(showCompleted));
        }
    }, [showCompleted, loading]);

    if (loading) return null;

    return <TaskDisplaySettingContext.Provider value={{ displayMode, setDisplayMode, showCompleted, setShowCompleted }}>{children}</TaskDisplaySettingContext.Provider>;
};

export const useTaskDisplaySetting = () => {
    const ctx = useContext(TaskDisplaySettingContext);
    if (!ctx) throw new Error('useTaskDisplaySetting must be used within TaskDisplaySettingProvider');
    return ctx;
};

export default TaskDisplaySettingProvider;
