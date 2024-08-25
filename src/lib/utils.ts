import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClientDataPoint } from '@/types/sensor';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toTwoFloatingPoints(value: number) {
    return Math.round(value * 100) / 100;
}

export function getDateFromDataPoint(dataPoint: ClientDataPoint) {
    const [time, period] = dataPoint.time.split(' ');
    const [hourString, minuteString, secondString] = time.split(':');
    let hours = parseInt(hourString);
    const minutes = parseInt(minuteString);
    const seconds = parseInt(secondString);

    if (period === 'PM' && hours < 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
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
