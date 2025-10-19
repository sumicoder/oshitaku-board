import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import SettingStyles from '../styles/SettingStyles';
import { getTaskResetTime, setTaskResetTime } from '../utils/taskResetScheduler';
import { useUserContext } from '../context/UserContext';

// タスクリセット設定のアコーディオン
export default function TaskResetSettingAccordion() {
    const [resetTime, setResetTime] = useState({ hour: 3, minute: 0 });
    const [loading, setLoading] = useState(true);
    const { resetAllTasks } = useUserContext();

    useEffect(() => {
        loadResetTime();
    }, []);

    const loadResetTime = async () => {
        try {
            const time = await getTaskResetTime();
            setResetTime(time);
        } catch (error) {
            console.error('リセット時刻読み込みエラー:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTimeChange = async (hour: number, minute: number = 0) => {
        try {
            await setTaskResetTime(hour, minute);
            setResetTime({ hour, minute });
        } catch (error) {
            console.error('リセット時刻設定エラー:', error);
            Alert.alert('エラー', 'リセット時刻の設定に失敗しました');
        }
    };

    const handleManualReset = () => {
        Alert.alert(
            'タスクリセット',
            'すべてのタスクを未完了状態にリセットしますか？',
            [
                { text: 'キャンセル', style: 'cancel' },
                {
                    text: 'リセット',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const success = await resetAllTasks();
                            if (success) {
                                Alert.alert('完了', 'タスクをリセットしました');
                            } else {
                                Alert.alert('エラー', 'リセットに失敗しました');
                            }
                        } catch (error) {
                            console.error('手動リセットエラー:', error);
                            Alert.alert('エラー', 'リセットに失敗しました');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <SettingAccordion title="タスクリセット設定">
                <Text style={SettingStyles.label}>読み込み中...</Text>
            </SettingAccordion>
        );
    }

    return (
        <SettingAccordion title="タスクリセット設定">
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>自動リセット時刻</Text>
                <View style={SettingStyles.radioGroup}>
                    <TimeButton 
                        label="午前3時" 
                        hour={3} 
                        minute={0}
                        selected={resetTime.hour === 3 && resetTime.minute === 0}
                        onPress={() => handleTimeChange(3, 0)}
                    />
                    <TimeButton 
                        label="午前6時" 
                        hour={6} 
                        minute={0}
                        selected={resetTime.hour === 6 && resetTime.minute === 0}
                        onPress={() => handleTimeChange(6, 0)}
                    />
                    <TimeButton 
                        label="午前0時" 
                        hour={0} 
                        minute={0}
                        selected={resetTime.hour === 0 && resetTime.minute === 0}
                        onPress={() => handleTimeChange(0, 0)}
                    />
                </View>
            </View>
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>手動リセット</Text>
                <ManualResetButton onPress={handleManualReset} />
            </View>
        </SettingAccordion>
    );
}

// 時刻選択ボタン
const TimeButton: React.FC<{
    label: string;
    hour: number;
    minute: number;
    selected: boolean;
    onPress: () => void;
}> = ({ label, selected, onPress }) => (
    <View style={[SettingStyles.radioButton, selected && SettingStyles.radioButtonSelected]}>
        <Text 
            style={[SettingStyles.radioButtonText, selected && SettingStyles.radioButtonTextSelected]}
            onPress={onPress}
        >
            {label}
        </Text>
    </View>
);

// 手動リセットボタン
const ManualResetButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <View style={[SettingStyles.button, { backgroundColor: '#ff6b6b' }]}>
        <Text style={[SettingStyles.buttonText, { color: 'white' }]} onPress={onPress}>
            今すぐリセット
        </Text>
    </View>
);