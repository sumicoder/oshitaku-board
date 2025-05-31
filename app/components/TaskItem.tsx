import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Task } from '../context/UserContext';

interface TaskItemProps {
    task: Task;
    style: ViewStyle;
    onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, style, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.taskItem, style]}>
        <Text style={styles.taskIcon}>{task.image}</Text>
        <Text style={styles.taskTitle}>{task.title}</Text>
        {task.done && (
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>できた！</Text>
            </View>
        )}
    </TouchableOpacity>
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,200,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 10,
    },
    overlayText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default TaskItem;
