import React from 'react';

type SensorStatItemProps = {
    label: string;
    value: number | string;
    sensorId?: number;
};

export const SensorStatItem = ({
    label,
    value,
    sensorId,
}: SensorStatItemProps) => (
    <StatsBox>
        <div>{`${label}: ${value}`}</div>
        {sensorId !== undefined && sensorId >= 0 && (
            <div>{`By sensor: ${sensorId}`}</div>
        )}
    </StatsBox>
);

const StatsBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col border-2 border-white br-4 p-4 rounded-2xl w-40 text-center justify-center items-center">
            {children}
        </div>
    );
};
