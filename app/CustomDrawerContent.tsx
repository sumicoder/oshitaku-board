import { RelativePathString, usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUserContext } from './context/UserContext';
import ClockSettingAccordion from './settings/ClockSettingAccordion';
import PeopleCountSettingAccordion from './settings/PeopleCountSettingAccordion';
import ProgressBarSettingAccordion from './settings/ProgressBarSettingAccordion';
import TaskDisplaySettingAccordion from './settings/TaskDisplaySettingAccordion';

// ページリンク情報の配列
const pageLinks = [
    { path: '/', label: 'ホーム' },
    { path: '/user', label: 'ユーザー一覧' },
    // { path: '/main', label: 'メインページ' },
    // { path: '/(tabs)', label: 'タブ' },
    // { path: '/page1', label: 'ページ1' },
    // { path: '/page2', label: 'ページ2' },
    // { path: '/other', label: 'その他ページ' },
];

// カスタムドロワーコンテンツ（ページリンク＋各種設定アコーディオン）
export default function CustomDrawerContent() {
    const router = useRouter();
    const pathname = usePathname();
    const { members, selectedUserIndex, addMember, selectUser } = useUserContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');

    // 動物アイコン例（絵文字）
    const taskImages = ['🌞', '🦷', '🧼', '👕', '🍚', '🧑‍🎓', '🎒', '🚪', '🏠', '🛁', '🛏️', '📚', '🎨', '🎮', '🍽️', '🦁', '🐻', '🐼', '🐰', '🐶', '🐱'];
    // カラー例
    const taskColors = ['#FFD700', '#00BFFF', '#FF69B4', '#90EE90', '#FFA500', '#FF6347', '#8A2BE2', '#00CED1', '#FFB6C1', '#A9A9A9'];

    // ページ遷移用リンクの共通関数
    const handleLinkPress = (path: string) => {
        if (pathname !== path) {
            router.push(path as RelativePathString);
        }
    };

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
            {/* ページ遷移リンク */}
            {pageLinks.map((link) => (
                <TouchableOpacity
                    key={link.path}
                    style={[styles.linkRow, pathname === link.path && styles.activeLinkRow]}
                    onPress={() => handleLinkPress(link.path)}
                    disabled={pathname === link.path} // 現在ページはタップ不可
                >
                    <Text style={[styles.linkText, pathname === link.path && styles.activeLinkText]}>{link.label}</Text>
                </TouchableOpacity>
            ))}

            {/* メンバー追加ボタン */}
            <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                <Text style={styles.addBtnText}>＋ メンバー追加</Text>
            </TouchableOpacity>
            {/* ユーザー一覧 */}
            <Text style={styles.sectionTitle}>ユーザー一覧</Text>
            {members.map((member, idx) => (
                <View key={member.name + idx} style={styles.userContainer}>
                    <TouchableOpacity
                        style={[styles.userRow, idx === selectedUserIndex && styles.selectedUserRow]}
                        onPress={() => {
                            selectUser(idx);
                        }}
                    >
                        <Text style={[styles.userName, idx === selectedUserIndex && styles.selectedUserName]}>{member.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            router.push(`/user/${selectedUserIndex}`);
                        }}
                    >
                        <Text style={styles.buttonText}>編集</Text>
                    </TouchableOpacity>
                </View>
            ))}
            {/* メンバー追加モーダル */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>メンバー名を入力</Text>
                        <TextInput style={styles.input} placeholder="名前" value={newMemberName} onChangeText={setNewMemberName} />
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={() => {
                                    if (newMemberName.trim()) {
                                        addMember(newMemberName.trim());
                                        setNewMemberName('');
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
                    </View>
                </View>
            </Modal>
            {/* 各種設定アコーディオン */}
            <ClockSettingAccordion />
            <ProgressBarSettingAccordion />
            <TaskDisplaySettingAccordion />
            <PeopleCountSettingAccordion />
        </ScrollView>
    );
}

// スタイル定義
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingTop: 40,
        paddingBottom: 40,
    },
    linkRow: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    activeLinkRow: {
        backgroundColor: '#e6f0ff',
    },
    linkText: {
        fontSize: 16,
        color: '#007AFF',
    },
    activeLinkText: {
        color: '#0051a8',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
        marginLeft: 16,
        color: '#333',
    },
    userRow: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedUserRow: {
        backgroundColor: '#e0e7ff',
    },
    userName: {
        fontSize: 16,
        color: '#222',
    },
    userContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        width: 280,
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
    modalBtn: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 8,
    },
    taskListRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    taskListNameBtn: {
        flex: 1,
    },
    taskListName: {
        fontSize: 16,
        color: '#222',
    },
    editBtn: {
        padding: 8,
    },
    editBtnText: {
        color: '#007AFF',
        fontSize: 16,
    },
    deleteBtn: {
        padding: 8,
    },
    deleteBtnText: {
        color: '#f44',
        fontSize: 16,
    },
});
