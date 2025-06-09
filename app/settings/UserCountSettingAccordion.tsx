import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import RadioButton from '../components/RadioButton';
import SettingAccordion from '../components/SettingAccordion';
import { useUserContext } from '../context/UserContext';
import { useUserCountSetting } from '../context/UserCountSettingContext';
import SettingStyles from '../styles/SettingStyles';

// 表示人数の設定アコーディオン
export default function UserCountSettingAccordion() {
    const { userCount, setUserCount } = useUserCountSetting();
    const { users } = useUserContext();

    // 最大3つまで
    const maxCount = Math.min(users.length, 3);
    const options = Array.from({ length: maxCount }, (_, i) => i + 1);

    // usersが変わった時やuserCountが変わった時に必ず1にリセット
    useEffect(() => {
        if (userCount !== 1) {
            setUserCount(1);
        }
    }, [users.length]); // users.lengthが変わった時に1に戻す

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
