import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { ClockSettingProvider } from './context/ClockSettingContext';
import { UserProvider } from './context/UserContext';
import UserSettingProvider from './context/UserSettingContext';
import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <UserSettingProvider>
            <UserProvider>
                <ClockSettingProvider>
                    <Drawer drawerContent={() => <CustomDrawerContent />} />
                </ClockSettingProvider>
            </UserProvider>
        </UserSettingProvider>
    );
}
