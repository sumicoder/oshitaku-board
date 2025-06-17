import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { User } from './context/UserContext';
import { colorList, useUserContext } from './context/UserContext';
import ClockSettingAccordion from './settings/ClockSettingAccordion';
import ProgressBarSettingAccordion from './settings/ProgressBarSettingAccordion';
import TaskDisplaySettingAccordion from './settings/TaskDisplaySettingAccordion';
import UserCountSettingAccordion from './settings/UserCountSettingAccordion';

// カスタムドロワーコンテンツ（ページリンク＋各種設定アコーディオン）
export default function CustomDrawerContent() {
    const router = useRouter();
    const { users, addUser, selectUser, moveUser, setUsersOrder } = useUserContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [selectedColor, setSelectedColor] = useState(colorList[0]);

    const handleOpenLink = () => {
        Alert.alert('応援ありがとうございます！', '開発者を応援するために外部リンクを開きますがよろしいですか？', [
            { text: 'コーヒーを奢りに行く', style: 'default', onPress: () => Linking.openURL('https://buymeacoffee.com/codecrane') },
            { text: 'レビューを書く', style: 'default', onPress: () => Linking.openURL('https://apps.apple.com/app/id6749811733') },
            { text: 'キャンセル', style: 'cancel' },
        ]);
    };

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
            {/* ユーザー一覧（ドラッグ&ドロップ対応） */}
            <Text style={styles.sectionTitle}>ユーザー一覧</Text>
            <DraggableFlatList
                data={users}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }: { data: User[] }) => setUsersOrder(data)}
                renderItem={({ item, drag, isActive }: { item: User; drag: () => void; isActive: boolean }) => (
                    <View style={[styles.userContainer, isActive && { backgroundColor: '#e0e7ff' }]} key={item.id}>
                        {/* ドラッグハンドル */}
                        <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
                            <AntDesign name="bars" size={22} color="#888" />
                        </TouchableOpacity>
                        {/* ユーザー名 */}
                        <Text style={[styles.userName]}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            {/* 編集ボタン */}
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: item.color }]}
                                onPress={() => {
                                    selectUser(item.id);
                                    router.push(`/user/${item.id}`);
                                }}
                            >
                                <Text style={styles.buttonText}>編集</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                scrollEnabled={false}
                activationDistance={10}
                containerStyle={{ paddingBottom: 8 }}
            />
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
            <TouchableOpacity style={styles.supportBanner} onPress={handleOpenLink}>
                <Text style={styles.supportBannerText}>☕ 開発者を応援する</Text>
            </TouchableOpacity>
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
        fontSize: 18,
        textAlign: 'center',
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
    dragHandle: {
        padding: 6,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    supportBanner: {
        marginHorizontal: 16,
        marginBlockStart: 32,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#ffe066',
        alignItems: 'center',
        justifyContent: 'center',
    },
    supportBannerText: {
        color: '#7c4d00',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
