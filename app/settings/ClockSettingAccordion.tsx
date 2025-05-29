import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import SettingStyles from '../styles/SettingStyles';

// 時計の設定アコーディオン
export default function ClockSettingAccordion() {
    // 時計の表示/非表示
    const [isVisible, setIsVisible] = useState(true);
    // アナログ or デジタル
    const [clockType, setClockType] = useState<'analog' | 'digital'>('analog');
    // サイズ（大中小）
    const [clockSize, setClockSize] = useState<'large' | 'medium' | 'small'>('medium');
    // 位置（右・左・真ん中）
    const [clockPosition, setClockPosition] = useState<'left' | 'center' | 'right'>('right');

    return (
        <SettingAccordion title="時計の設定">
            {/* 表示/非表示トグル */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>時計を表示</Text>
                <Switch value={isVisible} onValueChange={setIsVisible} />
            </View>
            {/* アナログ/デジタル選択 */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>タイプ</Text>
                <View style={SettingStyles.radioGroup}>
                    <RadioButton label="アナログ" selected={clockType === 'analog'} onPress={() => setClockType('analog')} />
                    <RadioButton label="デジタル" selected={clockType === 'digital'} onPress={() => setClockType('digital')} />
                </View>
            </View>
            {/* サイズ選択 */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>サイズ</Text>
                <View style={SettingStyles.radioGroup}>
                    <RadioButton label="大" selected={clockSize === 'large'} onPress={() => setClockSize('large')} />
                    <RadioButton label="中" selected={clockSize === 'medium'} onPress={() => setClockSize('medium')} />
                    <RadioButton label="小" selected={clockSize === 'small'} onPress={() => setClockSize('small')} />
                </View>
            </View>
            {/* 位置選択 */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>位置</Text>
                <View style={SettingStyles.radioGroup}>
                    <RadioButton label="左" selected={clockPosition === 'left'} onPress={() => setClockPosition('left')} />
                    <RadioButton label="真ん中" selected={clockPosition === 'center'} onPress={() => setClockPosition('center')} />
                    <RadioButton label="右" selected={clockPosition === 'right'} onPress={() => setClockPosition('right')} />
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
