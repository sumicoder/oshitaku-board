import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface DigitalClockProps {
    fontSize?: number;
    style?: any;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ fontSize = 48, style }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

    return <Text style={[styles.text, { fontSize }, style]}>{timeStr}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#222',
        letterSpacing: 2,
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});

export default DigitalClock;
