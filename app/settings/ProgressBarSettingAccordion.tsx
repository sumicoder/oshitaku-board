import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import SettingStyles from '../styles/SettingStyles';

// 進行度バーの設定アコーディオン
export default function ProgressBarSettingAccordion() {
    // 進行度バーの表示/非表示
    const [isVisible, setIsVisible] = useState(true);

    return (
        <SettingAccordion title="進行度バーの設定">
            {/* 表示/非表示トグル */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>進行度を<br />表示</Text>
                <Switch value={isVisible} onValueChange={setIsVisible} />
            </View>
        </SettingAccordion>
    );
}
