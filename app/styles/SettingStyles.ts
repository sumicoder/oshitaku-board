import { StyleSheet } from 'react-native';

const SettingStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
        paddingVertical: 2,
    },
    label: {
        width: 80,
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: '#f0f4ff',
    },
    radioButtonSelected: {
        backgroundColor: '#c7d2fe',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    radioCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 5,
        backgroundColor: '#fff',
    },
    radioCircleSelected: {
        backgroundColor: '#007AFF',
    },
    radioLabel: {
        fontSize: 11,
        color: '#333',
    },
    radioLabelSelected: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    iconGrid: {
        flexDirection: 'column',
        marginLeft: 4,
    },
    iconGridRow: {
        flexDirection: 'row',
        marginBottom: 1,
    },
    iconButton: {
        padding: 2,
        marginRight: 4,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f4ff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 40,
        minHeight: 40,
    },
    iconButtonSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#c7d2fe',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    iconText: {
        fontSize: 14,
    },
});

export default SettingStyles; 