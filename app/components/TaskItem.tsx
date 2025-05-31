import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Task } from '../context/UserContext';

interface TaskItemProps {
    task: Task;
    style: ViewStyle;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, style }) => (
    <View style={[styles.taskItem, style]}>
        <Text style={styles.taskIcon}>{task.image}</Text>
        <Text style={styles.taskTitle}>{task.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderColor: 'black',
        width: '100%',
    },
    taskIcon: {
        fontSize: 24,
        marginRight: 16,
        flexShrink: 0,
    },
    taskTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        flexShrink: 1,
    },
});

export default TaskItem;
