export type ClockSize = 'large' | 'medium' | 'small';

export function getClockSizePx(clockSize: ClockSize, height: number): number {
    switch (clockSize) {
        case 'large':
            return height * 0.6;
        case 'medium':
            return height * 0.5;
        case 'small':
            return height * 0.4;
        default:
            return 200;
    }
}

export default getClockSizePx;