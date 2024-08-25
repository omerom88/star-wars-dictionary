import { SensorButton } from '@/components/ui/sensor-button';
import { Sensor } from '@/types/sensor';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type SensorsListProps = {
    sensors: Sensor[];
    onSensorClick: (sensorId: number) => void;
    setAllSensorClick: (selected: boolean) => void;
};

export const SensorList = ({
    sensors,
    onSensorClick,
    setAllSensorClick,
}: SensorsListProps) => {
    const [allSelected, setAllSelected] = useState(false);
    return (
        <div className="flex flex-col border-4 border-white br-4 p-2 gap-2 rounded-2xl justify-between min-w-64 overflow-scroll">
            <Button
                className={`${allSelected ? 'bg-secondary text-primary' : 'bg-primary text-secondary'} py-5`}
                onClick={() => {
                    setAllSelected((prev) => !prev);
                    setAllSensorClick(!allSelected);
                }}
            >
                {allSelected ? 'None' : 'All'}
            </Button>
            {sensors.map((sensor) => (
                <SensorButton
                    key={sensor.id}
                    title={sensor.id}
                    selected={sensor.selected}
                    textColor={sensor.color}
                    onClick={onSensorClick}
                />
            ))}
        </div>
    );
};
