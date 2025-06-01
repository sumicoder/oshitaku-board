import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import SettingStyles from '../styles/SettingStyles';

// ラジオボタン用コンポーネント
interface RadioButtonProps {
    label: string;
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
}

export default function RadioButton({ label, selected, onPress, disabled = false }: RadioButtonProps) {
    return (
        <TouchableOpacity style={[SettingStyles.radioButton, selected && SettingStyles.radioButtonSelected, disabled && { opacity: 0.3 }]} onPress={disabled ? undefined : onPress} disabled={disabled}>
            <View style={[SettingStyles.radioCircle, selected && SettingStyles.radioCircleSelected]} />
            <Text style={[SettingStyles.radioLabel, selected && SettingStyles.radioLabelSelected]}>{label}</Text>
        </TouchableOpacity>
    );
}
