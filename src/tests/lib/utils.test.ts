import {
    toTwoFloatingPoints,
    getDateFromDataPoint,
    setDateFromSeconds,
} from '../../lib/utils';
import { ClientDataPoint } from '@/types/sensor';

describe('toTwoFloatingPoints', () => {
    it('should round to two decimal places', () => {
        expect(toTwoFloatingPoints(3.14159)).toBe(3.14);
        expect(toTwoFloatingPoints(2.005)).toBe(2.01);
        expect(toTwoFloatingPoints(10)).toBe(10);
        expect(toTwoFloatingPoints(0.001)).toBe(0);
    });
});

describe('getDateFromDataPoint', () => {
    it('should correctly parse AM times', () => {
        const dataPoint: ClientDataPoint = {
            time: '09:30:00 AM',
            values: [
                { 1: 10 },
                { 2: 20 },
                { 3: 30 },
            ] as ClientDataPoint['values'],
        };

        const result = getDateFromDataPoint(dataPoint as ClientDataPoint);

        expect(result.getHours()).toBe(9);
        expect(result.getMinutes()).toBe(30);
        expect(result.getSeconds()).toBe(0);
    });

    it('should correctly parse PM times', () => {
        const dataPoint: ClientDataPoint = {
            time: '02:45:30 PM',
            values: [
                { 1: 10 },
                { 2: 20 },
                { 3: 30 },
            ] as ClientDataPoint['values'],
        };

        const result = getDateFromDataPoint(dataPoint);

        expect(result.getHours()).toBe(14);
        expect(result.getMinutes()).toBe(45);
        expect(result.getSeconds()).toBe(30);
    });

    it('should handle 12 AM correctly', () => {
        const dataPoint: ClientDataPoint = {
            time: '12:00:00 AM',
            values: [
                { 1: 10 },
                { 2: 20 },
                { 3: 30 },
            ] as ClientDataPoint['values'],
        };

        const result = getDateFromDataPoint(dataPoint);

        expect(result.getHours()).toBe(0);
    });

    it('should handle 12 PM correctly', () => {
        const dataPoint: ClientDataPoint = {
            time: '12:00:00 PM',
            values: [
                { 1: 10 },
                { 2: 20 },
                { 3: 30 },
            ] as ClientDataPoint['values'],
        };
        const result = getDateFromDataPoint(dataPoint);
        expect(result.getHours()).toBe(12);
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
