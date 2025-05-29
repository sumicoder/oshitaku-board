import React, { createContext, ReactNode, useContext, useState } from 'react';

export type ClockType = 'analog' | 'digital';
export type ClockSize = 'large' | 'medium' | 'small';
export type ClockPosition = 'left' | 'center' | 'right';

interface ClockSettingContextType {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  clockType: ClockType;
  setClockType: (v: ClockType) => void;
  clockSize: ClockSize;
  setClockSize: (v: ClockSize) => void;
  clockPosition: ClockPosition;
  setClockPosition: (v: ClockPosition) => void;
}

const ClockSettingContext = createContext<ClockSettingContextType | undefined>(undefined);

export const ClockSettingProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [clockType, setClockType] = useState<ClockType>('analog');
  const [clockSize, setClockSize] = useState<ClockSize>('medium');
  const [clockPosition, setClockPosition] = useState<ClockPosition>('center');

  return (
    <ClockSettingContext.Provider value={{ isVisible, setIsVisible, clockType, setClockType, clockSize, setClockSize, clockPosition, setClockPosition }}>
      {children}
    </ClockSettingContext.Provider>
  );
};

export const useClockSetting = () => {
  const ctx = useContext(ClockSettingContext);
  if (!ctx) throw new Error('useClockSetting must be used within ClockSettingProvider');
  return ctx;
};
