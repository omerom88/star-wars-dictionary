import { ConcurrentMessageQueue } from '../../lib/concurrent-message-queue';

describe('ConcurrentMessageQueue', () => {
    let queue: ConcurrentMessageQueue;

    beforeEach(() => {
        // Reset the singleton instance before each test
        (ConcurrentMessageQueue as any).instance = undefined;
        queue = ConcurrentMessageQueue.getInstance(3); // Set max size to 3 for testing
    });

    it('should create a singleton instance', () => {
        const instance1 = ConcurrentMessageQueue.getInstance();
        const instance2 = ConcurrentMessageQueue.getInstance();
        expect(instance1).toBe(instance2);
    });

    it('should enqueue messages up to max size', async () => {
        const message1 = {
            id: '1',
            values: [10],
            time: '10:59:30 AM',
        };
        const message2 = {
            id: '2',
            values: [10, 20],
            time: '10:59:30 AM',
        };
        const message3 = {
            id: '3',
            values: [10, 20, 30],
            time: '10:59:30 AM',
        };

        expect(await queue.enqueue(message1)).toBe(true);
        expect(await queue.enqueue(message2)).toBe(true);
        expect(await queue.enqueue(message3)).toBe(true);
        expect(queue.queue.length).toBe(3);
    });

    it('should not enqueue messages beyond max size', async () => {
        const message1 = {
            id: '1',
            values: [10],
            time: '10:59:30 AM',
        };
        const message2 = {
            id: '2',
            values: [10, 20],
            time: '10:59:30 AM',
        };
        const message3 = {
            id: '3',
            values: [10, 20, 30],
            time: '10:59:30 AM',
        };
        const message4 = {
            id: '4',
            values: [10, 20, 30],
            time: '10:59:30 AM',
        };

        await queue.enqueue(message1);
        await queue.enqueue(message2);
        await queue.enqueue(message3);
        expect(await queue.enqueue(message4)).toBe(false);
        expect(queue.queue.length).toBe(3);
    });

    it('should dequeue messages in FIFO order', async () => {
        const message1 = {
            id: '1',
            values: [10],
            time: '10:59:30 AM',
        };
        const message2 = {
            id: '2',
            values: [10, 20],
            time: '10:59:30 AM',
        };

        await queue.enqueue(message1);
        await queue.enqueue(message2);

        expect(await queue.dequeue()).toEqual(message1);
        expect(await queue.dequeue()).toEqual(message2);
        expect(await queue.dequeue()).toBeUndefined();
    });

    it('should return undefined when dequeueing from an empty queue', async () => {
        expect(await queue.dequeue()).toBeUndefined();
    });
});
