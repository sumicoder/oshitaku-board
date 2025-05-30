import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import SettingStyles from '../styles/SettingStyles';

// 表示人数の設定アコーディオン
export default function PeopleCountSettingAccordion() {
    // 表示人数（1〜3人）
    const [peopleCount, setPeopleCount] = useState<1 | 2 | 3>(1);

    return (
        <SettingAccordion title="表示人数の設定">
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>人数</Text>
                <View style={SettingStyles.radioGroup}>
                    <RadioButton label="1人" selected={peopleCount === 1} onPress={() => setPeopleCount(1)} />
                    <RadioButton label="2人" selected={peopleCount === 2} onPress={() => setPeopleCount(2)} />
                    <RadioButton label="3人" selected={peopleCount === 3} onPress={() => setPeopleCount(3)} />
                </View>
            </View>
        </SettingAccordion>
    );
}

// ラジオボタン用コンポーネント
function RadioButton({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
    return (
        <TouchableOpacity style={[SettingStyles.radioButton, selected && SettingStyles.radioButtonSelected]} onPress={onPress}>
            <View style={[SettingStyles.radioCircle, selected && SettingStyles.radioCircleSelected]} />
            <Text style={[SettingStyles.radioLabel, selected && SettingStyles.radioLabelSelected]}>{label}</Text>
        </TouchableOpacity>
    );
}
