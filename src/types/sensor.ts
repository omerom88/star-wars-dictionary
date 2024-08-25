export type Sensor = {
    color: string;
    id: number;
    selected: boolean;
    max: number;
    min: number;
    average: number;
    sum: number;
    numberOfDataPoints: number;
};

export interface ServerDataPoint {
    time: string;
    values: number[];
    id: string;
}

export interface ClientDataPoint {
    time: string;
    values: Array<{ [sensorId: number]: number }>;
}

export type Measurement = {
    value: number;
    time: string;
    sensorId: number;
};
