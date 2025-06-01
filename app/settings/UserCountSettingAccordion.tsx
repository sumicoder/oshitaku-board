import React from 'react';
import { Text, View } from 'react-native';
import RadioButton from '../components/RadioButton';
import SettingAccordion from '../components/SettingAccordion';
import { useUserContext } from '../context/UserContext';
import { useUserSetting } from '../context/UserSettingContext';
import SettingStyles from '../styles/SettingStyles';

// 表示人数の設定アコーディオン
export default function UserCountSettingAccordion() {
    const { userCount, setUserCount } = useUserSetting();
    const { members } = useUserContext();

    // 最大3つまで
    const maxCount = Math.min(members.length, 3);
    const options = Array.from({ length: maxCount }, (_, i) => i + 1);

    return (
        <SettingAccordion title="表示人数の設定">
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>人数</Text>
                <View style={SettingStyles.radioGroup}>
                    {options.map((i) => (
                        <RadioButton key={i} label={`${i}人`} selected={userCount === i} onPress={() => setUserCount(i)} />
                    ))}
                </View>
            </View>
        </SettingAccordion>
    );
}
