'use client';

import { useState } from 'react';
import { SensorsList } from '@/components/sensors-list';
import { SensorsGraph } from '@/components/sensor-graph';
import { SensorsStats } from '@/components/sensor-stats';
import { SensorInfo } from '@/components/sensor-info';
import { useStore } from 'zustand';
import { useSensorStore } from '../hooks/use-sensors-sotre';
import { concurrentMessageQueue } from '@/lib/concurrent-message-queue';
import { useWebSocket } from '@/hooks/use-web-socket';
import { SensorsControl } from '@/components/sensors-control';
import { ServerDataPoint } from '@/types/sensor';

export function SensorDashboard() {
    const [sensorStore] = useState(useSensorStore);
    const {
        sensors,
        maxMeasurement,
        averageMeasurement,
        minMeasurement,
        dataPoints,
    } = useStore(sensorStore, (state) => ({
        sensors: state.sensors,
        maxMeasurement: state.maxMeasurement,
        averageMeasurement: state.averageMeasurement,
        minMeasurement: state.minMeasurement,
        dataPoints: state.dataPoints,
    }));
    const { setSensorClick, setAllSensorClick, setSensorsData } = useStore(
        sensorStore,
        (selector) => selector.actions
    );

    const { error, isConnected } = useWebSocket(
        'http://localhost:3001',
        async (message: ServerDataPoint) =>
            await concurrentMessageQueue.enqueue(message)
    );

    if (error) {
        console.error(error);
        return <div>Connection error</div>;
    }

    return (
        <div className="flex flex-row p-2 justify-between gap-2 max-h-screen">
            <SensorsList
                sensors={sensors}
                onSensorClick={setSensorClick}
                setAllSensorClick={setAllSensorClick}
            />
            <div className="flex flex-grow flex-col gap-2 justify-between">
                <SensorsControl setSensorsData={setSensorsData} />
                <SensorsGraph sensors={sensors} dataPoints={dataPoints} />
                <SensorsStats
                    maxMeasurement={maxMeasurement}
                    minMeasurement={minMeasurement}
                    averageMeasurement={averageMeasurement}
                />
            </div>
            <SensorInfo sensors={sensors} />
        </div>
    );
}
