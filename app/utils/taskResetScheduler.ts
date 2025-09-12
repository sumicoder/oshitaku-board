import AsyncStorage from '@react-native-async-storage/async-storage';

// Expo Goではバックグラウンドタスクが制限されているため、
// アプリ起動時とアクティブ時のチェックのみでリセット機能を提供

// UTC+9（日本標準時）での現在日付を取得する関数
const getUtc9Date = (): string => {
    const now = new Date();
    const utc9Now = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9に変換
    return utc9Now.toISOString().slice(0, 10); // YYYY-MM-DD形式で返す
};

// UTC+9（日本標準時）での現在時刻を取得する関数
const getUtc9DateTime = (): Date => {
    const now = new Date();
    return new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9に変換
};

// 指定した時刻が過ぎているかチェックする関数
const hasResetTimePassed = async (currentUtc9DateTime: Date, lastResetDate: string): Promise<boolean> => {
    const { hour, minute, second } = await getTaskResetTime();
    const today = getUtc9Date();
    // 今日の設定時刻を作成（UTC+9オフセット適用済み）
    const todayResetTime = new Date(currentUtc9DateTime);
    todayResetTime.setHours(hour + 9, minute, second + 1, 0); // UTC+9オフセット適用

    // 最後のリセットが今日でない場合、かつ現在時刻が設定時刻を過ぎている場合
    if (lastResetDate !== today && currentUtc9DateTime >= todayResetTime) {
        return true;
    }

    return false;
};

// リセット時刻チェック関数
export const checkAndResetTasks = async () => {
    try {
        // 最後のリセット日時をチェック
        const lastResetDate = await AsyncStorage.getItem('lastTaskResetDate');
        const currentUtc9DateTime = getUtc9DateTime(); // UTC+9での現在日時を取得
        const today = getUtc9Date(); // UTC+9での現在日付を取得

        // 設定された時刻が過ぎているかチェック
        const shouldReset = await hasResetTimePassed(currentUtc9DateTime, lastResetDate || '');

        if (shouldReset) {
            // 全ユーザーのタスクをリセット
            const usersData = await AsyncStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);
                const resetUsers = users.map((user: any) => ({
                    ...user,
                    taskLists: user.taskLists.map((list: any) => ({
                        ...list,
                        tasks: list.tasks.map((task: any) => ({
                            ...task,
                            done: false
                        }))
                    }))
                }));
                await AsyncStorage.setItem('users', JSON.stringify(resetUsers));
                await AsyncStorage.setItem('lastTaskResetDate', today);
                console.log('タスクリセット完了');
                return true; // リセットが実行された
            }
        }
        return false; // リセットは実行されなかった
    } catch (error) {
        console.error('タスクリセットチェックエラー:', error);
        return false;
    }
};

// バックグラウンドタスクの登録（Expo Goでは無効）
export const registerTaskResetBackgroundFetch = async () => {
    console.log('バックグラウンドタスク: Expo Goでは制限されているため、アプリ起動時チェックのみ有効');
};

// バックグラウンドタスクの登録解除（Expo Goでは無効）
export const unregisterTaskResetBackgroundFetch = async () => {
    console.log('バックグラウンドタスク登録解除: Expo Goでは制限されているため、何もしません');
};

// リセット時刻の設定
export const setTaskResetTime = async (hour: number, minute: number = 0) => {
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    await AsyncStorage.setItem('taskResetTime', timeString);
    console.log('リセット時刻設定:', timeString);
};

// リセット時刻の取得
export const getTaskResetTime = async (): Promise<{ hour: number; minute: number; second: number }> => {
    const resetTime = await AsyncStorage.getItem('taskResetTime');
    if (resetTime) {
        const [hour, minute, second] = resetTime.split(':').map(Number);
        return { hour, minute, second };
    }
    return { hour: 3, minute: 0, second: 0 }; // デフォルト: 3:00:00
};

// 手動でタスクリセットを実行
export const manualTaskReset = async () => {
    try {
        const usersData = await AsyncStorage.getItem('users');
        if (usersData) {
            const users = JSON.parse(usersData);
            const resetUsers = users.map((user: any) => ({
                ...user,
                taskLists: user.taskLists.map((list: any) => ({
                    ...list,
                    tasks: list.tasks.map((task: any) => ({
                        ...task,
                        done: false
                    }))
                }))
            }));
            await AsyncStorage.setItem('users', JSON.stringify(resetUsers));
            // UTC+9での現在日付を使用
            const today = getUtc9Date();
            await AsyncStorage.setItem('lastTaskResetDate', today);
            console.log('手動タスクリセット完了');
            return true;
        }
        return false;
    } catch (error) {
        console.error('手動タスクリセットエラー:', error);
        return false;
    }
};

// デフォルトエクスポート（警告回避用）
export default {
    checkAndResetTasks,
    registerTaskResetBackgroundFetch,
    unregisterTaskResetBackgroundFetch,
    setTaskResetTime,
    getTaskResetTime,
    manualTaskReset,
};