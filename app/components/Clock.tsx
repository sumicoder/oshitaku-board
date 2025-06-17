import React, { useEffect, useState } from 'react';
import { Circle, Line, Svg, Text as SvgText } from 'react-native-svg';

interface ClockProps {
    size?: number;
}

const Clock: React.FC<ClockProps> = ({ size }) => {
    if (!size) return null;
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

    // 文字盤の数字を配置
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    const center = size / 2;
    const radius = center - (size * 0.1); // 数字の半径
    const fontSize = size * 0.09;

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle cx={center} cy={center} r={center - 5} fill="#fff" stroke="#333" strokeWidth="4" />
            {/* 文字盤の数字 */}
            {numbers.map((n) => {
                const angle = ((n - 3) * 30) * (Math.PI / 180); // 12時を上に
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle) + fontSize / 8;
                return (
                    <SvgText
                        key={n}
                        x={x}
                        y={y}
                        fontSize={fontSize}
                        fontWeight="bold"
                        fill="#333"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        {n}
                    </SvgText>
                );
            })}
            {/* Hour hand */}
            <Line x1={center} y1={center} x2={center} y2={center - size * 0.25} stroke="#333" strokeWidth="6" strokeLinecap="round" transform={`rotate(${hourDeg} ${center} ${center})`} />
            {/* Minute hand */}
            <Line x1={center} y1={center} x2={center} y2={center - size * 0.35} stroke="#333" strokeWidth="4" strokeLinecap="round" transform={`rotate(${minDeg} ${center} ${center})`} />
            {/* Second hand */}
            <Line x1={center} y1={center} x2={center} y2={center - size * 0.42} stroke="#e00" strokeWidth="2" strokeLinecap="round" transform={`rotate(${secDeg} ${center} ${center})`} />
            <Circle cx={center} cy={center} r="6" fill="#333" />
        </Svg>
    );
};

export default Clock;
