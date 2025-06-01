import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { ClockSettingProvider } from './context/ClockSettingContext';
import TaskDisplaySettingProvider from './context/TaskDisplaySettingContext';
import { UserProvider } from './context/UserContext';
import UserSettingProvider from './context/UserSettingContext';
import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <TaskDisplaySettingProvider>
            <UserSettingProvider>
                <UserProvider>
                    <ClockSettingProvider>
                        <Drawer drawerContent={() => <CustomDrawerContent />} />
                    </ClockSettingProvider>
                </UserProvider>
            </UserSettingProvider>
        </TaskDisplaySettingProvider>
    );
}
