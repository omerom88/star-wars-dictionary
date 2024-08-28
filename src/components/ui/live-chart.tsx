import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { toTwoFloatingPoints } from '@/lib/utils';

type LiveChartProps = {
    data: any[];
    lines: { title: string; color: string }[];
    xAxisKey?: string;
};

export const LiveChart = ({
    data,
    lines,
    xAxisKey = 'time',
}: LiveChartProps) => {
    const [yDomain, setYDomain] = useState([0, 100]);

    useEffect(() => {
        if (data.length > 0) {
            // Update Y-axis domain
            const allValues = data.flatMap((point) =>
                lines.map((line) => point[line])
            );
            const minValue = toTwoFloatingPoints(Math.min(...allValues));
            const maxValue = toTwoFloatingPoints(Math.max(...allValues));
            setYDomain([minValue - 0.5, maxValue + 0.5]);
        }
    }, [data, lines]);

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey={xAxisKey}
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis domain={yDomain} tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    {lines.map((line, index) => (
                        <Line
                            key={line.title}
                            type="monotone"
                            dataKey={line.title}
                            stroke={line.color}
                            dot={false}
                            isAnimationActive={true}
                            animationDuration={300}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
