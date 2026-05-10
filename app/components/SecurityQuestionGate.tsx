import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSecurityGateSetting } from '../context/SecurityGateSettingContext';

type SecurityQuestionGateProps = {
    onPassed: () => void;
};

// 設定画面を開く前に、簡単な掛け算クイズでワンクッション入れるコンポーネント（設定で無効化可能）
export default function SecurityQuestionGate({ onPassed }: SecurityQuestionGateProps) {
    const { showCalculationModal } = useSecurityGateSetting();
    const [isSecurityModalVisible, setIsSecurityModalVisible] = useState(false);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [answerText, setAnswerText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // モーダルを開くたびに新しい問題を生成して、前回の入力状態をクリアする
    const openSecurityCheckModal = () => {
        // 1桁×1桁（それぞれ 1〜9）
        const randomFirstNumber = Math.floor(Math.random() * 9) + 1;
        const randomSecondNumber = Math.floor(Math.random() * 9) + 1;
        setFirstNumber(randomFirstNumber);
        setSecondNumber(randomSecondNumber);
        setAnswerText('');
        setErrorMessage('');
        setIsSecurityModalVisible(true);
    };

    // 正解時のみ呼び出し元へ通知して設定画面を開かせる
    const handleSubmitSecurityAnswer = () => {
        const expectedAnswer = firstNumber * secondNumber;
        const inputAnswer = Number(answerText);
        if (inputAnswer === expectedAnswer) {
            setIsSecurityModalVisible(false);
            setErrorMessage('');
            setAnswerText('');
            onPassed();
            return;
        }
        setErrorMessage('答えがちがいます。もう一度ためしてください。');
    };

    // 計算モーダルがオフのときは、そのままドロワーを開く
    const handleSettingButtonPress = () => {
        if (!showCalculationModal) {
            onPassed();
            return;
        }
        openSecurityCheckModal();
    };

    return (
        <>
            <TouchableOpacity style={styles.settingButton} onPress={handleSettingButtonPress}>
                <Text style={styles.settingButtonText}>設定</Text>
            </TouchableOpacity>
            <Modal visible={isSecurityModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>かんたんな問題にこたえてください</Text>
                        <Text style={styles.questionText}>
                            {firstNumber} × {secondNumber} = ?
                        </Text>
                        <TextInput
                            style={styles.answerInput}
                            keyboardType="number-pad"
                            value={answerText}
                            onChangeText={setAnswerText}
                            placeholder="答えを入力"
                        />
                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitSecurityAnswer}>
                                <Text style={styles.buttonText}>確認</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setIsSecurityModalVisible(false);
                                    setAnswerText('');
                                    setErrorMessage('');
                                }}
                            >
                                <Text style={styles.buttonText}>キャンセル</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    settingButton: {
        marginLeft: 16,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    settingButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 320,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    answerInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 18,
    },
    errorText: {
        marginTop: 8,
        color: '#d00',
        fontSize: 14,
    },
    buttonRow: {
        marginTop: 16,
        flexDirection: 'row',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginHorizontal: 6,
    },
    cancelButton: {
        backgroundColor: '#999',
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginHorizontal: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
