import { Measurement } from '@/types/sensor';
import { StatsBox } from '@/components/ui/stats-box';

type SensorsStatsProps = {
    maxMeasurement: Measurement;
    minMeasurement: Measurement;
    averageMeasurement: Measurement;
    actualRate: number;
};

export const SensorsStats = ({
    maxMeasurement,
    minMeasurement,
    averageMeasurement,
    actualRate,
}: SensorsStatsProps) => {
    return (
        <div className="flex flex-col border-4 border-white br-4 p-4 rounded-2xl space-y-8">
            <div className="text-center text-xl">Total</div>
            <div className="flex flex-row justify-evenly">
                <StatsBox>
                    <div>{`Actual rate: ${actualRate}`}</div>
                </StatsBox>
                <StatsBox>
                    <div>{`Max: ${maxMeasurement.value}`}</div>
                    {maxMeasurement.sensorId >= 0 && (
                        <div>{`By sensor: ${maxMeasurement.sensorId}`}</div>
                    )}
                </StatsBox>
                <StatsBox>
                    <div>{`Average: ${averageMeasurement.value}`}</div>
                </StatsBox>
                <StatsBox>
                    <div>{`Min: ${minMeasurement.value}`}</div>
                    {minMeasurement.sensorId >= 0 && (
                        <div>{`By sensor: ${minMeasurement.sensorId}`}</div>
                    )}
                </StatsBox>
            </div>
        </div>
    );
};
