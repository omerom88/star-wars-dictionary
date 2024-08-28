import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toTwoFloatingPoints(value: number) {
    return Math.round(value * 100) / 100;
}

export function setDateFromSeconds(
    seconds: number,
    latestDataPoint: Date
): Date {
    latestDataPoint.setHours(
        latestDataPoint.getHours(),
        latestDataPoint.getMinutes(),
        latestDataPoint.getSeconds() - seconds,
        0
    );
    return latestDataPoint;
}
