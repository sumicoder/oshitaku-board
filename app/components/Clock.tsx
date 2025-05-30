import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';

interface ClockProps {
    size?: number;
    style?: StyleProp<ViewStyle>;
}

const Clock: React.FC<ClockProps> = ({ size = 200, style }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hour = date.getHours();

    const secDeg = sec * 6;
    const minDeg = min * 6 + sec * 0.1;
    const hourDeg = (hour % 12) * 30 + min * 0.5;

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}>
            <Circle cx={size / 2} cy={size / 2} r={size / 2 - 5} fill="#fff" stroke="#333" strokeWidth="4" />
            {/* Hour hand */}
            <Line x1={size / 2} y1={size / 2} x2={size / 2} y2={size / 2 - size * 0.25} stroke="#333" strokeWidth="6" strokeLinecap="round" transform={`rotate(${hourDeg} ${size / 2} ${size / 2})`} />
            {/* Minute hand */}
            <Line x1={size / 2} y1={size / 2} x2={size / 2} y2={size / 2 - size * 0.35} stroke="#333" strokeWidth="4" strokeLinecap="round" transform={`rotate(${minDeg} ${size / 2} ${size / 2})`} />
            {/* Second hand */}
            <Line x1={size / 2} y1={size / 2} x2={size / 2} y2={size / 2 - size * 0.42} stroke="#e00" strokeWidth="2" strokeLinecap="round" transform={`rotate(${secDeg} ${size / 2} ${size / 2})`} />
            <Circle cx={size / 2} cy={size / 2} r="6" fill="#333" />
        </Svg>
    );
};

export default Clock;
