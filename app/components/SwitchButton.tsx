import React from 'react';
import { Switch } from 'react-native';

interface SwitchButtonProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

export default function SwitchButton({ value, onValueChange, disabled = false }: SwitchButtonProps) {
    return <Switch value={value} onValueChange={onValueChange} disabled={disabled} style={{ opacity: disabled ? 0.3 : 1 }} />;
}
