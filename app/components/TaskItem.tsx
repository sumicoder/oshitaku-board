import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Task, User } from '../context/UserContext';
import { hexToRgba } from '../utils/hexToRgba';
import { renderIcon } from '../utils/renderIcon';

interface TaskItemProps {
    task: Task;
    currentUser: User;
    style: ViewStyle;
    onPress: () => void;
    editMode?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, currentUser, style, onPress, editMode }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.taskItem, style]}>
            <View style={styles.taskIcon}>{renderIcon({ name: task.image.name, type: task.image.type }, 32, '#333')}</View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            {task.done && !editMode && (
                <View style={[styles.overlay, { backgroundColor: hexToRgba(currentUser.color, 0.95) }]}>
                    <Text style={styles.overlayText}>{renderIcon({ name: 'check', type: 'AntDesign' }, 24, 'white')}</Text>
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
