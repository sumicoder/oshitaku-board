import React, { useEffect } from 'react';
import { Switch, Text, View } from 'react-native';
import RadioButton from '../components/RadioButton';
import SwitchButton from '../components/SwitchButton';
import SettingAccordion from '../components/SettingAccordion';
import { useTaskDisplaySetting } from '../context/TaskDisplaySettingContext';
import SettingStyles from '../styles/SettingStyles';
import { useUserSetting } from '../context/UserSettingContext';

// タスク表示の設定アコーディオン
export default function TaskDisplaySettingAccordion() {
    const { displayMode, setDisplayMode, showCompleted, setShowCompleted } = useTaskDisplaySetting();
    const { userCount } = useUserSetting();

    // displayModeが変わったときに自動補正
    useEffect(() => {
        if (displayMode === 'single') setShowCompleted(true); // 単一表示の場合は完了タスクを必ず表示
    }, [displayMode, setShowCompleted]);

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
                <Text style={SettingStyles.label}>完了タスク<br />を表示</Text>
                <SwitchButton value={showCompleted} onValueChange={setShowCompleted} disabled={displayMode === 'single'} />
            </View>
        </SettingAccordion>
    );
}
