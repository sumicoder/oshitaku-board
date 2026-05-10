import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

/** AsyncStorage に保存するキー（設定ドロワー／ユーザー編集前の計算モーダルの ON/OFF） */
const STORAGE_KEY = 'securityShowCalculationModal';

interface SecurityGateSettingContextType {
    /** true のとき、設定ボタン・ユーザー名タップで掛け算モーダルを表示する */
    showCalculationModal: boolean;
    setShowCalculationModal: (value: boolean) => void;
}

const SecurityGateSettingContext = createContext<SecurityGateSettingContextType | undefined>(undefined);

export const SecurityGateSettingProvider = ({ children }: { children: ReactNode }) => {
    const [showCalculationModal, setShowCalculationModal] = useState(true);
    const [loading, setLoading] = useState(true);

    // 起動時に保存済みの設定を読み込む（未保存時は従来どおりモーダルを出す）
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored === 'false') {
                    setShowCalculationModal(false);
                } else {
                    setShowCalculationModal(true);
                }
            } catch {
                setShowCalculationModal(true);
            }
            setLoading(false);
        })();
    }, []);

    // 変更のたびに永続化する
    useEffect(() => {
        if (!loading) {
            AsyncStorage.setItem(STORAGE_KEY, String(showCalculationModal));
        }
    }, [showCalculationModal, loading]);

    if (loading) {
        return null;
    }

    return (
        <SecurityGateSettingContext.Provider value={{ showCalculationModal, setShowCalculationModal }}>{children}</SecurityGateSettingContext.Provider>
    );
};

export const useSecurityGateSetting = () => {
    const ctx = useContext(SecurityGateSettingContext);
    if (!ctx) throw new Error('useSecurityGateSetting must be used within SecurityGateSettingProvider');
    return ctx;
};

export default SecurityGateSettingProvider;
