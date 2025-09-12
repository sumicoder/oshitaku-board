import { Dimensions, Platform } from 'react-native';

/**
 * デバイスタイプの判定
 */
export const getDeviceType = () => {
    const { width, height } = Dimensions.get('window');
    const aspectRatio = height / width;
    
    if (Platform.OS === 'ios') {
        // iPadの判定：画面サイズとアスペクト比で判断
        if (Math.min(width, height) >= 768) {
            return 'ipad';
        }
        return 'iphone';
    }
    
    if (Platform.OS === 'android') {
        // Androidタブレットの判定
        if (Math.min(width, height) >= 600) {
            return 'tablet';
        }
        return 'phone';
    }
    
    return 'web';
};

/**
 * デバイスがタブレット（iPad含む）かどうかを判定
 */
export const isTablet = () => {
    const deviceType = getDeviceType();
    return deviceType === 'ipad' || deviceType === 'tablet';
};

/**
 * デバイスがスマートフォン（iPhone含む）かどうかを判定
 */
export const isPhone = () => {
    const deviceType = getDeviceType();
    return deviceType === 'iphone' || deviceType === 'phone';
};

/**
 * レスポンシブなフォントサイズを取得
 */
export const getResponsiveFontSize = (phoneSize: number, tabletSize: number) => {
    return isTablet() ? tabletSize : phoneSize;
};

/**
 * 戻るボタン用のフォントサイズを取得
 */
export const getBackButtonFontSize = () => {
    return getResponsiveFontSize(16, 24);
};

// デフォルトエクスポート（警告回避用）
export default {
    getDeviceType,
    isTablet,
    isPhone,
    getResponsiveFontSize,
    getBackButtonFontSize,
}; 