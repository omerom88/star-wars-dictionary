import { LiveChart } from '@/components/ui/live-chart';
import { ClientDataPoint, Sensor } from '@/types/sensor';
import { useEffect, useState } from 'react';
import { getDateFromDataPoint, setDateFromSeconds } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

export type SensorsGraphProps = {
    sensors: Sensor[];
    dataPoints: ClientDataPoint[];
};

const MAX_LOOKUP_PERIOD = 20;
const MIN_LOOKUP_PERIOD = 1;
const LOOKUP_STEP = 1;

export const SensorsGraph = ({ sensors, dataPoints }: SensorsGraphProps) => {
    const [data, setData] = useState(dataPoints);
    const [lookupPeriod, setLookupPeriod] = useState(MAX_LOOKUP_PERIOD);

    useEffect(() => {
        setData(dataPoints.filter((item) => filterByLookupPeriod(item)));
    }, [dataPoints, lookupPeriod]);

    const filterByLookupPeriod = (dataPoint: ClientDataPoint) => {
        const latestDataPoint = dataPoints.at(-1);
        if (latestDataPoint) {
            const fromDate = setDateFromSeconds(
                lookupPeriod,
                getDateFromDataPoint(latestDataPoint.time)
            );
            const dataPointDate = getDateFromDataPoint(dataPoint.time);
            return dataPointDate >= fromDate;
        }
        return true;
    };

    const lines = sensors
        .filter((item) => item.selected)
        .map((sensor) => ({
            title: sensor.id + '',
            color: sensor.color,
        }));

    return (
        <div className="flex flex-col w-full border-4 border-white br-4 pr-8 pt-16 pb-8 gap-8 rounded-2xl min-h-96 min-w-96 ">
            <LiveChart lines={lines} data={data} />
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-row items-center w-full ml-4 gap-4">
                    <div>Lookup period (seconds)</div>
                    <Slider
                        min={MIN_LOOKUP_PERIOD}
                        max={MAX_LOOKUP_PERIOD}
                        step={LOOKUP_STEP}
                        defaultValue={[lookupPeriod]}
                        value={[lookupPeriod]}
                        onValueChange={(value) => setLookupPeriod(value[0])}
                    />
                </div>
            </div>
        </div>
    );
};
