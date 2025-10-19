import React from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import { Drawer } from 'expo-router/drawer';
import ClockSettingProvider from './context/ClockSettingContext';
import ProgressBarSettingProvider from './context/ProgressBarSettingContext';
import TaskDisplaySettingProvider from './context/TaskDisplaySettingContext';
import UserProvider from './context/UserContext';
import UserCountSettingProvider from './context/UserCountSettingContext';
import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    // アプリが起動中は画面のスリープを無効にする
    useKeepAwake();

    return (
        <ClockSettingProvider>
            <ProgressBarSettingProvider>
                <TaskDisplaySettingProvider>
                    <UserProvider>
                        <UserCountSettingProvider>
                            <Drawer drawerContent={() => <CustomDrawerContent />} />
                        </UserCountSettingProvider>
                    </UserProvider>
                </TaskDisplaySettingProvider>
            </ProgressBarSettingProvider>
        </ClockSettingProvider>
    );
}
