import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import { useTaskDisplaySetting } from '../context/TaskDisplaySettingContext';
import SettingStyles from '../styles/SettingStyles';

// タスク表示の設定アコーディオン
export default function TaskDisplaySettingAccordion() {
    const { displayMode, setDisplayMode, showCompleted, setShowCompleted } = useTaskDisplaySetting();

    return (
        <SettingAccordion title="タスク表示の設定">
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>表示方法</Text>
                <View style={SettingStyles.radioGroup}>
                    <RadioButton label="一覧表示" selected={displayMode === 'list'} onPress={() => setDisplayMode('list')} />
                    <RadioButton label="単一表示" selected={displayMode === 'single'} onPress={() => setDisplayMode('single')} />
                </View>
            </View>
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>完了タスクを表示</Text>
                <Switch value={showCompleted} onValueChange={setShowCompleted} />
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
