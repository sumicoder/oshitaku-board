import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import { useUserContext } from '../context/UserContext';
import { useUserSetting } from '../context/UserSettingContext';
import SettingStyles from '../styles/SettingStyles';

// 表示人数の設定アコーディオン
export default function PeopleCountSettingAccordion() {
    const { peopleCount, setPeopleCount } = useUserSetting();
    const { members } = useUserContext();

    // 最大3つまで
    const maxCount = Math.min(members.length, 3);
    const options = Array.from({ length: maxCount }, (_, i) => i + 1);

    return (
        <SettingAccordion title="表示人数の設定">
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>人数</Text>
                <View style={SettingStyles.radioGroup}>
                    {options.map(i => (
                        <RadioButton
                            key={i}
                            label={`${i}人`}
                            selected={peopleCount === i}
                            onPress={() => setPeopleCount(i)}
                        />
                    ))}
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
