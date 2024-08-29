import { Measurement } from '@/types/sensor';
import { SensorStatItem } from '@/components/ui/stats-box';

type SensorsStatsProps = {
    maxMeasurement: Measurement;
    minMeasurement: Measurement;
    averageMeasurement: Measurement;
    actualRate: number;
};

export const SensorsTotalStats = ({
    maxMeasurement,
    minMeasurement,
    averageMeasurement,
    actualRate,
}: SensorsStatsProps) => (
    <div className="flex flex-col p-4 space-y-8">
        <div className="text-center text-xl">Total</div>
        <div className="flex flex-row justify-evenly">
            <SensorStatItem label="Actual rate" value={actualRate} />
            <SensorStatItem
                label="Max"
                value={maxMeasurement.value}
                sensorId={maxMeasurement.sensorId}
            />
            <SensorStatItem label="Average" value={averageMeasurement.value} />
            <SensorStatItem
                label="Min"
                value={minMeasurement.value}
                sensorId={minMeasurement.sensorId}
            />
        </div>
    </div>
);
