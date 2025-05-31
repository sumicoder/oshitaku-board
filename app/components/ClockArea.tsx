import React from 'react';
import { useWindowDimensions, View, ViewStyle } from 'react-native';
import { useClockSetting } from '../context/ClockSettingContext';
import Clock from './Clock';
import DigitalClock from './DigitalClock';

// 時計表示専用コンポーネント
const ClockArea: React.FC = () => {
    // 時計設定（グローバル）
    const { clockType, clockSize } = useClockSetting();
    const { height } = useWindowDimensions();

    // サイズ計算
    const sizeMap = {
        large: height * 0.6,
        medium: height * 0.5,
        small: height * 0.4,
    };
    const clockSizePx = sizeMap[clockSize];
    if (!clockSizePx) return null;

    const clockContainerStyle: ViewStyle = {
        width: clockSizePx,
        height: clockType === 'analog' ? clockSizePx : undefined,
    };

    return <View style={clockContainerStyle}>{clockType === 'analog' ? <Clock size={clockSizePx} /> : <DigitalClock fontSize={clockSizePx / 6} />}</View>;
};

export default ClockArea;
