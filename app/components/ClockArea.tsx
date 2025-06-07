import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useClockSetting } from '../context/ClockSettingContext';
import { useUserCountSetting } from '../context/UserCountSettingContext';
import { getClockSizePx } from '../utils/clockSize';
import Clock from './Clock';
import DigitalClock from './DigitalClock';

interface ClockAreaProps {
    windowHeight: number;
    windowWidth: number;
}

// 時計表示専用コンポーネント
const ClockArea: React.FC<ClockAreaProps> = ({ windowHeight, windowWidth }) => {
    // 時計設定（グローバル）
    const { clockType, clockSize } = useClockSetting();
    const { userCount } = useUserCountSetting();

    if (userCount === 3) return null;

    // サイズ計算
    const clockSizePx = getClockSizePx(clockSize, Math.min(windowHeight, windowWidth));
    if (!clockSizePx) return null;
    const clockPadding = 20;
    const clockAdjustedSize = clockSizePx - clockPadding * 2;

    const clockContainerStyle: ViewStyle = {
        width: clockSizePx,
        height: clockType === 'analog' ? clockSizePx : undefined,
        paddingHorizontal: clockPadding,
    };

    return <View style={clockContainerStyle}>{clockType === 'analog' ? <Clock size={clockAdjustedSize} /> : <DigitalClock fontSize={clockAdjustedSize / 6} />}</View>;
};

export default ClockArea;
