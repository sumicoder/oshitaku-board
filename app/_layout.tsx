import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { ClockSettingProvider } from './context/ClockSettingContext';
import { UserProvider } from './context/UserContext';

import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <UserProvider>
            <ClockSettingProvider>
                <Drawer drawerContent={() => <CustomDrawerContent />} />
            </ClockSettingProvider>
        </UserProvider>
    );
}
