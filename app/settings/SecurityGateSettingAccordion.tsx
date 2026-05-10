import React from 'react';
import { Text, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import SwitchButton from '../components/SwitchButton';
import { useSecurityGateSetting } from '../context/SecurityGateSettingContext';
import SettingStyles from '../styles/SettingStyles';

// 設定・ユーザー編集前に表示する計算モーダルのオン／オフを切り替えるアコーディオン
export default function SecurityGateSettingAccordion() {
    const { showCalculationModal, setShowCalculationModal } = useSecurityGateSetting();

    return (
        <SettingAccordion title="計算確認の設定">
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>計算モーダル</Text>
                <SwitchButton value={showCalculationModal} onValueChange={setShowCalculationModal} />
            </View>
            <View style={{ paddingHorizontal: 12, paddingBottom: 10 }}>
                <Text style={{ fontSize: 14, color: '#555', lineHeight: 20 }}>
                    オンのとき、左上の「設定」またはユーザー名タップで掛け算を表示します。オフにするとそのまま画面が開きます。
                </Text>
            </View>
        </SettingAccordion>
    );
}
