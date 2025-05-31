import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import { useClockSetting } from '../context/ClockSettingContext';
import { useUserSetting } from '../context/UserSettingContext';
import SettingStyles from '../styles/SettingStyles';

// 時計の設定アコーディオン
export default function ClockSettingAccordion() {
    const {
        isVisible,
        setIsVisible,
        clockType,
        setClockType,
        clockSize,
        setClockSize,
        clockPosition,
        setClockPosition,
    } = useClockSetting();
    const { peopleCount } = useUserSetting();

    // 選択肢を動的に
    const options = peopleCount === 1
        ? [{ label: '左', value: 'left' }, { label: '右', value: 'right' }]
        : [{ label: '左', value: 'left' }, { label: '真ん中', value: 'center' }, { label: '右', value: 'right' }];

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
                    {options.map(opt => (
                        <RadioButton
                            key={opt.value}
                            label={opt.label}
                            selected={clockPosition === opt.value}
                            onPress={() => setClockPosition(opt.value as any)}
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
