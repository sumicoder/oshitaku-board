import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colorList, useUserContext } from './context/UserContext';
import ClockSettingAccordion from './settings/ClockSettingAccordion';
import ProgressBarSettingAccordion from './settings/ProgressBarSettingAccordion';
import TaskDisplaySettingAccordion from './settings/TaskDisplaySettingAccordion';
import UserCountSettingAccordion from './settings/UserCountSettingAccordion';

// カスタムドロワーコンテンツ（ページリンク＋各種設定アコーディオン）
export default function CustomDrawerContent() {
    const router = useRouter();
    const { users, addUser, selectUser, moveUser } = useUserContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [selectedColor, setSelectedColor] = useState(colorList[0]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* ユーザー追加ボタン */}
            {users.length < 3 ? (
                <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addBtnText}>＋ ユーザー追加</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.sectionTitle}>ユーザーは3人までしか追加できません</Text>
            )}
            {/* ユーザー一覧 */}
            <Text style={styles.sectionTitle}>ユーザー一覧</Text>
            {users.map((user, idx) => (
                <View key={user.name + idx} style={styles.userContainer}>
                    <View>
                        {/* 上へボタン */}
                        <TouchableOpacity style={[styles.arrowBtn, idx === 0 && styles.arrowBtnDisabled]} onPress={() => moveUser(user.id, idx - 1)} disabled={idx === 0}>
                            <AntDesign name="caretup" size={20} color={idx === 0 ? '#ccc' : '#007AFF'} />
                        </TouchableOpacity>
                        {/* 下へボタン */}
                        <TouchableOpacity style={[styles.arrowBtn, idx === users.length - 1 && styles.arrowBtnDisabled]} onPress={() => moveUser(user.id, idx + 1)} disabled={idx === users.length - 1}>
                            <AntDesign name="caretdown" size={20} color={idx === users.length - 1 ? '#ccc' : '#007AFF'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.userName]}>{user.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {/* 編集ボタン */}
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: user.color }]}
                            onPress={() => {
                                selectUser(user.id);
                                router.push(`/user/${user.id}`);
                            }}
                        >
                            <Text style={styles.buttonText}>編集</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            {/* ユーザー追加モーダル */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>ユーザー名を入力</Text>
                        <TextInput style={styles.input} placeholder="名前" value={newUserName} onChangeText={setNewUserName} />
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12 }}>色を選択</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            {colorList.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[styles.colorButton, { backgroundColor: color }, selectedColor === color && styles.colorButtonSelected]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={() => {
                                    if (newUserName.trim()) {
                                        addUser(newUserName.trim(), selectedColor);
                                        setNewUserName('');
                                        setModalVisible(false);
                                    }
                                }}
                            >
                                <Text style={{ color: '#fff' }}>追加</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#aaa' }]} onPress={() => setModalVisible(false)}>
                                <Text style={{ color: '#fff' }}>キャンセル</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* 各種設定アコーディオン */}
            <ClockSettingAccordion />
            <ProgressBarSettingAccordion />
            <TaskDisplaySettingAccordion />
            <UserCountSettingAccordion />
        </ScrollView>
    );
}

// スタイル定義
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 40,
    },
    addBtn: {
        margin: 16,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 10,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        marginVertical: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
        marginLeft: 16,
        color: '#333',
    },
    userName: {
        fontSize: 20,
        color: '#222',
    },
    userContainer: {
        paddingInlineStart: 20,
        marginHorizontal: 16,
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedUserName: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: 200,
        marginTop: 12,
        fontSize: 16,
    },
    colorButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    colorButtonSelected: {
        borderColor: '#007AFF',
        borderWidth: 3,
    },
    modalBtn: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 8,
    },
    arrowBtn: {
        padding: 6,
    },
    arrowBtnDisabled: {
        opacity: 0.5,
    },
});
