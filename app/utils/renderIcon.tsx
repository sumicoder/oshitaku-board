import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Icon } from '../context/UserContext';

/**
 * アイコンセット名とアイコン名から該当のアイコンコンポーネントを返すユーティリティ関数
 * @param icon アイコン情報（name: アイコン名, type: アイコンセット名）
 * @param size アイコンサイズ（デフォルト: 32）
 * @param color アイコンカラー（デフォルト: #333）
 * @returns React.ReactNode
 */
export const renderIcon = (icon: Icon, size: number = 32, color: string = '#333'): React.ReactNode => {
    switch (icon.type) {
        case 'AntDesign':
            return <AntDesign name={icon.name as any} size={size} color={color} />;
        case 'FontAwesome':
            return <FontAwesome name={icon.name as any} size={size} color={color} />;
        case 'MaterialIcons':
            return <MaterialIcons name={icon.name as any} size={size} color={color} />;
        case 'Feather':
            return <Feather name={icon.name as any} size={size} color={color} />;
        case 'Ionicons':
            return <Ionicons name={icon.name as any} size={size} color={color} />;
        case 'Entypo':
            return <Entypo name={icon.name as any} size={size} color={color} />;
        default:
            return null;
    }
};
