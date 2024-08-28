import { Sensor } from '@/types/sensor';
import { ExpandableCard } from '@/components/ui/expendable-card';
import { useMemo } from 'react';

type SensorsStatsProps = {
    sensors: Sensor[];
};

export const SensorInfo = ({ sensors }: SensorsStatsProps) => (
    <div className="flex flex-col border-4 border-white br-4 p-2 gap-2 rounded-2xl min-w-96 overflow-scroll">
        {sensors?.map((sensor) => {
            return (
                <div key={sensor.id}>
                    <ExpandableCard
                        title={`Sensors ${sensor.id}`}
                        titleColor={sensor.color}
                    >
                        <div>
                            <div>{`Min: ${sensor.min}`}</div>
                            <div>{`Max: ${sensor.max}`}</div>
                            <div>{`Average: ${sensor.average}`}</div>
                            <div>{`Sum: ${sensor.sum}`}</div>
                            <div>
                                Number of events: {sensor.numberOfDataPoints}
                            </div>
                        </div>
                    </ExpandableCard>
                </div>
            );
        })}
    </div>
);
