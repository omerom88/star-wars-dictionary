import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerDataPoint } from '@/types/sensor';

interface UseWebSocketResult {
    error: string | null;
    isConnected: boolean;
}

export const useWebSocket = (
    url: string,
    setUpdate: (message: ServerDataPoint) => Promise<boolean>
): UseWebSocketResult => {
    const [error, setError] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket: Socket = io(url, {
            withCredentials: true,
            extraHeaders: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            setIsConnected(true);
            setError(null);
            console.log('Connected to data emitter service');
        });

        socket.on('dataUpdate', async (newDataPoint: ServerDataPoint) => {
            await setUpdate(newDataPoint);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            setError('Disconnected from server');
            console.log('Disconnected from data emitter service');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { error, isConnected };
};
