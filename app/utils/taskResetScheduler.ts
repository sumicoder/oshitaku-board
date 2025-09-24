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

// 次回リセット予定時刻を計算する関数
const calculateNextResetTime = (currentUtc9DateTime: Date, resetHour: number, resetMinute: number, resetSecond: number): Date => {
    // 安全な値に変換（undefinedやNaNを防ぐ）
    const safeHour = Number.isInteger(resetHour) ? resetHour : 0;
    const safeMinute = Number.isInteger(resetMinute) ? resetMinute : 0;
    const safeSecond = Number.isInteger(resetSecond) ? resetSecond : 1;

    // 今日のリセット時刻を作成（UTC+9オフセットを考慮）
    // currentUtc9DateTimeは既にUTC+9オフセットが適用済みなので、そのまま使用
    const nextReset = new Date(currentUtc9DateTime);
    const debugNextReset = new Date(currentUtc9DateTime);

    // UTC+9オフセットを考慮して、日本時間の設定時刻をUTC時刻に変換
    nextReset.setHours(safeHour + 9, safeMinute, safeSecond + 1, 0);
    debugNextReset.setHours(safeHour + 9, safeMinute, safeSecond + 1, 0);
    console.log('debugNextReset:',debugNextReset);

    // 今日のリセット時刻が過ぎている場合は明日のリセット時刻
    if (nextReset <= currentUtc9DateTime) {
        // 明日のリセット時刻を作成
        const tomorrow = new Date(currentUtc9DateTime);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(safeHour + 9, safeMinute, safeSecond + 1, 0);
        nextReset.setTime(tomorrow.getTime());
    }

    return nextReset;
};

// リセットが必要かチェックする関数
const shouldResetTasks = async (currentUtc9DateTime: Date): Promise<boolean> => {
    const nextResetTimeStr = await AsyncStorage.getItem('nextTaskResetTime');

    if (!nextResetTimeStr) {
        // 初回起動時はリセットしない
        return false;
    }

    const nextResetTime = new Date(parseInt(nextResetTimeStr));

    // 現在時刻が次回リセット時刻を過ぎているかチェック
    return currentUtc9DateTime >= nextResetTime;
};

// リセット時刻チェック関数
export const checkAndResetTasks = async () => {
    try {
        const currentUtc9DateTime = getUtc9DateTime(); // UTC+9での現在日時を取得
        const today = getUtc9Date(); // UTC+9での現在日付を取得

        // リセットが必要かチェック
        const shouldReset = await shouldResetTasks(currentUtc9DateTime);

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

                // 次回リセット予定時刻を計算して保存
                const { hour, minute, second } = await getTaskResetTime();
                const nextResetTime = calculateNextResetTime(currentUtc9DateTime, hour, minute, second);
                await AsyncStorage.setItem('nextTaskResetTime', nextResetTime.getTime().toString());

                return true; // リセットが実行された
            }
        }
        return false; // リセットは実行されなかった
    } catch (error) {
        console.error('タスクリセットチェックエラー:', error);
        return false;
    }
};

// リセット時刻の設定
export const setTaskResetTime = async (hour: number, minute: number = 0) => {
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    await AsyncStorage.setItem('taskResetTime', timeString);
};

// リセット時刻の取得
export const getTaskResetTime = async (): Promise<{ hour: number; minute: number; second: number }> => {
    const resetTime = await AsyncStorage.getItem('taskResetTime');
    if (resetTime) {
        const timeParts = resetTime.split(':');
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);
        const second = timeParts[2] ? parseInt(timeParts[2], 10) : 1; // secondが存在しない場合は1
        return { hour, minute, second };
    }
    return { hour: 3, minute: 0, second: 1 }; // デフォルト: 3:00:00
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

            // UTC+9での現在日付と時刻を使用
            const currentUtc9DateTime = getUtc9DateTime();
            const today = getUtc9Date();
            await AsyncStorage.setItem('lastTaskResetDate', today);

            // 次回リセット予定時刻を計算して保存
            const { hour, minute, second } = await getTaskResetTime();
            const nextResetTime = calculateNextResetTime(currentUtc9DateTime, hour, minute, second);
            await AsyncStorage.setItem('nextTaskResetTime', nextResetTime.getTime().toString());

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
    setTaskResetTime,
    getTaskResetTime,
    manualTaskReset,
};