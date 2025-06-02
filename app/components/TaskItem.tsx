import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Task, User } from '../context/UserContext';
import { hexToRgba } from '../utils/hexToRgba';

interface TaskItemProps {
    task: Task;
    currentUser: User;
    style: ViewStyle;
    onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, currentUser, style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.taskItem, style]}>
            <Text style={styles.taskIcon}>{task.image}</Text>
            <Text style={styles.taskTitle}>{task.title}</Text>
            {task.done && (
                <View style={[styles.overlay, { backgroundColor: hexToRgba(currentUser.color, 0.7) }]}>
                    <Text style={styles.overlayText}>できた！</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

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
        overflow: 'hidden',
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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    overlayText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default TaskItem;
