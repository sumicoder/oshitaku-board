import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import { ClockPosition, useClockSetting } from '../context/ClockSettingContext';
import { useUserSetting } from '../context/UserSettingContext';
import SettingStyles from '../styles/SettingStyles';
import RadioButton from '../components/RadioButton';
import SwitchButton from '../components/SwitchButton';

// 時計の設定アコーディオン
export default function ClockSettingAccordion() {
    const { isVisible, setIsVisible, clockType, setClockType, clockSize, setClockSize, clockPosition, setClockPosition } = useClockSetting();
    const { userCount } = useUserSetting();

    // 選択肢を動的に
    const options = [
        { label: '左', value: 'left', disabled: userCount === 2 || userCount === 3 },
        { label: '真ん中', value: 'center', disabled: userCount === 1 || userCount === 3 },
        { label: '右', value: 'right', disabled: userCount === 2 || userCount === 3 },
    ];

    // userCountやclockPositionが変わったときに自動補正
    useEffect(() => {
        if (userCount === 1) {
            if (clockPosition === 'center' || clockPosition === undefined || clockPosition === null || clockPosition === '') {
                setClockPosition('left'); // または 'right'
            }
        } else if (userCount === 2) {
            if (clockPosition !== 'center') {
                setClockPosition('center');
            }
        } else if (userCount === 3) {
            if (clockPosition !== undefined && clockPosition !== null && clockPosition !== '') {
                setClockPosition(''); // 未選択状態
            }
            if (isVisible) setIsVisible(false); // 時計を必ず非表示
        }
    }, [userCount, clockPosition, setClockPosition, isVisible, setIsVisible]);

    return (
        <SettingAccordion title="時計の設定">
            {/* 表示/非表示トグル */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>時計を表示</Text>
                <SwitchButton value={isVisible} onValueChange={setIsVisible} disabled={userCount === 3} />
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
                    {options.map((opt) => (
                        <RadioButton key={opt.value} label={opt.label} selected={clockPosition === opt.value} onPress={() => setClockPosition(opt.value as ClockPosition)} disabled={opt.disabled} />
                    ))}
                </View>
            </View>
        </SettingAccordion>
    );
}
