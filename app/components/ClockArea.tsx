import React from 'react';
import { useWindowDimensions, View, ViewStyle } from 'react-native';
import { useClockSetting } from '../context/ClockSettingContext';
import Clock from './Clock';
import DigitalClock from './DigitalClock';
import { getClockSizePx } from '../utils/clockSize';

// 時計表示専用コンポーネント
const ClockArea: React.FC = () => {
    // 時計設定（グローバル）
    const { clockType, clockSize } = useClockSetting();
    const { height } = useWindowDimensions();

    // サイズ計算
    const clockSizePx = getClockSizePx(clockSize, height);
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
