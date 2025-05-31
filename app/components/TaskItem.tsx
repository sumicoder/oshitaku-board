import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Task } from '../context/UserContext';

interface TaskItemProps {
    task: Task;
    maxWidth: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, maxWidth }) => (
    <View style={[styles.taskItem, { maxWidth: maxWidth }]}>
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
        borderWidth: 1,
        margin: 4,
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
