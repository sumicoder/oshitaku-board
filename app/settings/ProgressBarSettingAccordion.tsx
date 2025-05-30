import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import SettingAccordion from '../components/SettingAccordion';
import SettingStyles from '../styles/SettingStyles';

// 動物アイコンのリスト
const animalIcons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

// 進行度バーの設定アコーディオン
export default function ProgressBarSettingAccordion() {
    // 進行度バーの表示/非表示
    const [isVisible, setIsVisible] = useState(true);
    // 選択中の動物アイコン
    const [selectedAnimal, setSelectedAnimal] = useState(animalIcons[0]);

    // 3×4のグリッドに分割
    const grid = [];
    for (let i = 0; i < animalIcons.length; i += 4) {
        grid.push(animalIcons.slice(i, i + 4));
    }

    return (
        <SettingAccordion title="進行度バーの設定">
            {/* 表示/非表示トグル */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>バーを表示</Text>
                <Switch value={isVisible} onValueChange={setIsVisible} />
            </View>
            {/* アイコン選択（グリッド表示） */}
            <View style={SettingStyles.row}>
                <Text style={SettingStyles.label}>アイコン</Text>
                <View style={SettingStyles.iconGrid}>
                    {grid.map((row, rowIndex) => (
                        <View style={SettingStyles.iconGridRow} key={rowIndex}>
                            {row.map((icon) => (
                                <TouchableOpacity key={icon} style={[SettingStyles.iconButton, selectedAnimal === icon && SettingStyles.iconButtonSelected]} onPress={() => setSelectedAnimal(icon)}>
                                    <Text style={SettingStyles.iconText}>{icon}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </SettingAccordion>
    );
}
