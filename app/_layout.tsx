import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClockSettingProvider } from './context/ClockSettingContext';
import { UserProvider } from './context/UserContext';

import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <UserProvider>
            <ClockSettingProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Drawer drawerContent={() => <CustomDrawerContent />} />
                </GestureHandlerRootView>
            </ClockSettingProvider>
        </UserProvider>
    );
}
