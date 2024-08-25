import { ServerDataPoint } from '@/types/sensor';

export class ConcurrentMessageQueue {
    private static instance: ConcurrentMessageQueue;
    queue: ServerDataPoint[] = [];
    maxSize = 0;

    private constructor(maxSize = Infinity) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    public static getInstance(maxSize = Infinity): ConcurrentMessageQueue {
        if (!ConcurrentMessageQueue.instance) {
            ConcurrentMessageQueue.instance = new ConcurrentMessageQueue(
                maxSize
            );
        }
        return ConcurrentMessageQueue.instance;
    }

    async enqueue(message: ServerDataPoint) {
        if (this.queue.length < this.maxSize) {
            this.queue.push(message);
            return true;
        }
        return false;
    }

    async dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
        return;
    }
}

export const concurrentMessageQueue = ConcurrentMessageQueue.getInstance();
