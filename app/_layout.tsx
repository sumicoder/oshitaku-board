import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { ClockSettingProvider } from './context/ClockSettingContext';
import TaskDisplaySettingProvider from './context/TaskDisplaySettingContext';
import { UserProvider } from './context/UserContext';
import UserCountSettingProvider from './context/UserCountSettingContext';
import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <TaskDisplaySettingProvider>
            <UserCountSettingProvider>
                <UserProvider>
                    <ClockSettingProvider>
                        <Drawer drawerContent={() => <CustomDrawerContent />} />
                    </ClockSettingProvider>
                </UserProvider>
            </UserCountSettingProvider>
        </TaskDisplaySettingProvider>
    );
}
