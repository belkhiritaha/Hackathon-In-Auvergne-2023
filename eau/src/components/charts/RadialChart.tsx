import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const data = [
    {
        "name": "maïs",
        "uv": 31.47,
        "pv": 2400,
        "fill": "#8884d8"
    },
    {
        "name": "blé",
        "uv": 26.69,
        "pv": 4567,
        "fill": "#83a6ed"
    },
    {
        "name": "orge",
        "uv": 15.69,
        "pv": 1398,
        "fill": "#8dd1e1"
    },
    {
        "name": "avoine",
        "uv": 8.22,
        "pv": 9800,
        "fill": "#82ca9d"
    },
];

const SimpleRadialChart = () => {

    return (
        <RadialBarChart
            width={730}
            height={250}
            innerRadius="10%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
        >
            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
            <Tooltip />
        </RadialBarChart>
    );

}

export default SimpleRadialChart;