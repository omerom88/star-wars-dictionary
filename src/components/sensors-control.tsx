import { Button } from '@/components/ui/button';
import { concurrentMessageQueue } from '@/lib/concurrent-message-queue';
import {
    openSocket,
    resetSocket,
    stopSocket,
} from '@/app/actions/socket-actions';
import { ServerDataPoint } from '@/types/sensor';

let emitInterval: NodeJS.Timeout | null = null;
const FPS_IN_MILLISECONDS = 100;

type SensorsControlProps = {
    setSensorsData: (data: ServerDataPoint) => void;
};

export const SensorsControl = ({ setSensorsData }: SensorsControlProps) => {
    const pullFromQueueAnsSetToStore = () => {
        emitInterval = setInterval(async () => {
            const message = await concurrentMessageQueue.dequeue();
            if (message) {
                setSensorsData(message);
            }
        }, FPS_IN_MILLISECONDS);
    };

    const onStart = async () => {
        await openSocket();
        pullFromQueueAnsSetToStore();
    };

    const onStop = async () => {
        await stopSocket();
        if (emitInterval) {
            clearInterval(emitInterval as NodeJS.Timeout);
            emitInterval = null;
        }
    };

    const onReset = async () => {
        await resetSocket();
    };

    return (
        <div className="flex justify-evenly border-4 border-white br-4 p-4 rounded-2xl">
            <Button onClick={onStart}>Start</Button>
            <Button onClick={onStop}>Stop</Button>
            <Button onClick={onReset}>Reset</Button>
        </div>
    );
};
