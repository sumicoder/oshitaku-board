import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Tab() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Home',
                    headerRight: () => <Link href="/settings">設定</Link>,
                }}
            />
            <Text>Tab [Home]</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
