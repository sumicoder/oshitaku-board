import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import UserTasks from './UserTasks';

// 時計表示専用コンポーネント
const UserArea: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <UserTasks userId={0} />
            </ScrollView>
            <ScrollView>
                <UserTasks userId={1} />
            </ScrollView>
        </View>
    );
};

export default UserArea;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        gap: 10,
        width: '100%',
        height: '100%',
    },
});