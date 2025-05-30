import React from 'react';
import { Dimensions, View } from 'react-native';
import { useClockSetting } from '../context/ClockSettingContext';
import Clock from './Clock';
import DigitalClock from './DigitalClock';

// 時計表示専用コンポーネント
const ClockArea: React.FC = () => {
    // 時計設定（グローバル）
    const { isVisible, clockType, clockSize, clockPosition } = useClockSetting();
    const { height, width } = Dimensions.get('window');
    // サイズ計算
    const sizeMap = { large: height * 0.6, medium: height * 0.4, small: height * 0.3 };
    const clockSizePx = sizeMap[clockSize];
    // 配置スタイル
    const posStyle = (() => {
        switch (clockPosition) {
            case 'left': return { left: 10, top: 100, alignItems: 'flex-start' as const };
            case 'center': return { left: width/2 - clockSizePx/2, top: 100, alignItems: 'center' as const };
            case 'right': return { right: 10, top: 100, alignItems: 'flex-end' as const };
        }
    })();
    const clockContainerStyle = {
        position: 'absolute' as const,
        zIndex: -1 as const,
        width: clockSizePx,
        height: clockType === 'analog' ? clockSizePx : undefined,
        ...posStyle,
    };

    if (!isVisible) return null;
    return (
        <View style={clockContainerStyle} pointerEvents="none">
            {clockType === 'analog' ? (
                <Clock size={clockSizePx} style={{ width: clockSizePx, height: clockSizePx }} />
            ) : (
                <DigitalClock fontSize={clockSizePx / 5} style={{ width: clockSizePx }} />
            )}
        </View>
    );
};

export default ClockArea; 