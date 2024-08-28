import { createStore } from 'zustand';
import {
    ClientDataPoint,
    Measurement,
    Sensor,
    ServerDataPoint,
} from '@/types/sensor';
import { getDateFromDataPoint, toTwoFloatingPoints } from '@/lib/utils';

const MAX_DATA_POINTS = 200;
const LINE_COLORS = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff8042',
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A28FD0',
    '#FF6347',
    '#4682B4',
    '#6A5ACD',
    '#20B2AA',
    '#FF4500',
    '#DA70D6',
    '#32CD32',
    '#FFD700',
    '#8A2BE2',
    '#5F9EA0',
    '#D2691E',
];

type SensorState = {
    sensors: Sensor[];
    dataPoints: ClientDataPoint[];
    maxMeasurement: Measurement;
    averageMeasurement: Measurement;
    actualRate: number;
    minMeasurement: Measurement;
    actions: {
        setSensorsData(data: ServerDataPoint): void;
        setSensorClick(sensorId: number): void;
        setAllSensorClick(selected: boolean): void;
    };
};

const defaultStoreValues: Pick<SensorState, ['actions']> = {
    sensors: Array.from({ length: 20 }, (_, i) => ({
        id: i,
        selected: false,
        max: 0,
        min: 0,
        average: 0,
        sum: 0,
        numberOfDataPoints: 0,
        color: LINE_COLORS[i % LINE_COLORS.length],
    })),
    dataPoints: [],
    maxMeasurement: {
        value: 0,
        time: Date.now(),
        sensorId: -1,
    },
    averageMeasurement: {
        value: 0,
        time: Date.now(),
        sensorId: -1,
    },
    minMeasurement: {
        value: 0,
        time: Date.now(),
        sensorId: -1,
    },
    actualRate: 0,
};

export function useSensorStore() {
    return createStore<SensorState>()((set) => ({
        ...defaultStoreValues,
        actions: {
            setSensorsData: (data: ServerDataPoint) => {
                const clientDataPoint = {
                    time: data.time,
                };

                //map through all the data values from the server
                data.values.map((measurementValue, index) => {
                    clientDataPoint[index] = measurementValue;

                    //set max measurement
                    set((state) =>
                        measurementValue > state.maxMeasurement.value
                            ? {
                                  maxMeasurement: {
                                      value: measurementValue,
                                      time: data.time,
                                      sensorId: index,
                                  },
                              }
                            : state.maxMeasurement
                    );

                    //set average measurement
                    set((state) => {
                        const value = toTwoFloatingPoints(
                            (state.averageMeasurement.value +
                                measurementValue) /
                                (state.dataPoints.length + 1)
                        );
                        return {
                            averageMeasurement: {
                                value,
                                time: data.time,
                                sensorId: index,
                            },
                        };
                    });

                    //set min measurement
                    set((state) =>
                        measurementValue < state.minMeasurement.value
                            ? {
                                  minMeasurement: {
                                      value: measurementValue,
                                      time: data.time,
                                      sensorId: index,
                                  },
                              }
                            : state.minMeasurement
                    );

                    //set sensors stats
                    set((state) => ({
                        sensors: state.sensors.map((sensor) => {
                            const average = toTwoFloatingPoints(
                                (sensor.average + measurementValue) /
                                    (sensor.numberOfDataPoints + 1)
                            );
                            const sum = toTwoFloatingPoints(
                                sensor.sum + measurementValue
                            );
                            return sensor.id === index
                                ? {
                                      ...sensor,
                                      max: Math.max(
                                          sensor.max,
                                          measurementValue
                                      ),
                                      min: Math.min(
                                          sensor.min,
                                          measurementValue
                                      ),
                                      average,
                                      sum,
                                      numberOfDataPoints:
                                          sensor.numberOfDataPoints + 1,
                                  }
                                : sensor;
                        }),
                    }));
                });

                //set actual rate + data points
                set((state) => {
                    const currentTime = data.time;
                    const previousTime = state.dataPoints.at(-1)?.time;

                    const elapsedTime =
                        new Date(currentTime).getTime() -
                        new Date(previousTime).getTime();

                    return {
                        actualRate: elapsedTime,
                        dataPoints: [
                            ...state.dataPoints,
                            clientDataPoint,
                        ].slice(-MAX_DATA_POINTS),
                    };
                });
            },

            setSensorClick: (sensorId: number) => {
                set((state) => ({
                    sensors: state.sensors.map((sensor) =>
                        sensor.id === sensorId
                            ? { ...sensor, selected: !sensor.selected }
                            : sensor
                    ),
                }));
            },

            setAllSensorClick: (selected: boolean) => {
                set((state) => ({
                    sensors: state.sensors.map((sensor) => ({
                        ...sensor,
                        selected,
                    })),
                }));
            },
        },
    }));
}
