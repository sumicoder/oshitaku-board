import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from './CustomDrawerContent';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={() => <CustomDrawerContent />} />
        </GestureHandlerRootView>
    );
}
