'use client';

import { useState } from 'react';
import { SensorList } from '@/components/sensor-list';
import { SensorsGraph } from '@/components/sensor-graph';
import { SensorsTotalStats } from '@/components/sensor-total-stats';
import { SensorInfo } from '@/components/sensor-info';
import { useStore } from 'zustand';
import { useSensorStore } from '@/hooks/use-sensor-sotre';
import { concurrentMessageQueue } from '@/lib/concurrent-message-queue';
import { useWebSocket } from '@/hooks/use-web-socket';
import { SensorControl } from '@/components/sensor-control';
import { ServerDataPoint } from '@/types/sensor';
import { FullScreenText } from '@/components/ui/full-screen-text';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

export function SensorDashboard() {
    const [sensorStore] = useState(useSensorStore);
    const {
        sensors,
        maxMeasurement,
        averageMeasurement,
        minMeasurement,
        dataPoints,
        actualRate,
    } = useStore(sensorStore, (state) => ({
        sensors: state.sensors,
        maxMeasurement: state.maxMeasurement,
        averageMeasurement: state.averageMeasurement,
        minMeasurement: state.minMeasurement,
        dataPoints: state.dataPoints,
        actualRate: state.actualRate,
    }));
    const { setSensorClick, setAllSensorClick, setSensorsData, clearData } =
        useStore(sensorStore, (selector) => selector.actions);

    const { error, isConnected } = useWebSocket(
        'http://localhost:3001',
        async (message: ServerDataPoint) =>
            await concurrentMessageQueue.enqueue(message)
    );

    if (error) {
        console.error(error);
        return (
            <FullScreenText text="Connection Error! Please check the server." />
        );
    }
    if (!isConnected) {
        return <FullScreenText text="Connecting..." />;
    }

    return (
        <ErrorBoundary
            errorComponent={({ error }) => (
                <FullScreenText
                    text={`React encountered an error: ${error.message}. Please reload.`}
                />
            )}
        >
            <div className="flex flex-row p-2 justify-between gap-2 max-h-screen">
                <SensorList
                    sensors={sensors}
                    onSensorClick={setSensorClick}
                    setAllSensorClick={setAllSensorClick}
                />
                <div className="flex flex-grow flex-col gap-2 justify-between">
                    <SensorControl setSensorsData={setSensorsData} />
                    <SensorsGraph sensors={sensors} dataPoints={dataPoints} />
                    <SensorsTotalStats
                        maxMeasurement={maxMeasurement}
                        minMeasurement={minMeasurement}
                        averageMeasurement={averageMeasurement}
                        actualRate={actualRate}
                    />
                </div>
                <SensorInfo sensors={sensors} />
            </div>
        </ErrorBoundary>
    );
}
