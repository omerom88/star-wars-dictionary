import { setDateFromSeconds, toTwoFloatingPoints } from '../../lib/utils';

describe('toTwoFloatingPoints', () => {
    it('should round to two decimal places', () => {
        expect(toTwoFloatingPoints(3.14159)).toBe(3.14);
        expect(toTwoFloatingPoints(2.005)).toBe(2.01);
        expect(toTwoFloatingPoints(10)).toBe(10);
        expect(toTwoFloatingPoints(0.001)).toBe(0);
    });
});

describe('setDateFromSeconds', () => {
    it('should subtract the correct number of seconds', () => {
        const latestDataPoint = new Date('2023-04-15T14:30:00');
        const result = setDateFromSeconds(30, latestDataPoint);
        expect(result.getHours()).toBe(14);
        expect(result.getMinutes()).toBe(29);
        expect(result.getSeconds()).toBe(30);
    });

    it('should handle crossing minute boundaries', () => {
        const latestDataPoint = new Date('2023-04-15T14:00:00');
        const result = setDateFromSeconds(90, latestDataPoint);
        expect(result.getHours()).toBe(13);
        expect(result.getMinutes()).toBe(58);
        expect(result.getSeconds()).toBe(30);
    });

    it('should handle crossing hour boundaries', () => {
        const latestDataPoint = new Date('2023-04-15T00:00:30');
        const result = setDateFromSeconds(60, latestDataPoint);
        expect(result.getHours()).toBe(23);
        expect(result.getMinutes()).toBe(59);
        expect(result.getSeconds()).toBe(30);
    });
});
