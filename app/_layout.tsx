import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './context/UserContext';

import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <UserProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer drawerContent={() => <CustomDrawerContent />} />
            </GestureHandlerRootView>
        </UserProvider>
    );
}
