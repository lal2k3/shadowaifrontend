import React from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Box } from '@mui/material';
import mockFunnelData from 'mocks/mockFunnelData';

interface FunnelData {
  name: string;
  value: number;
}

const prepareFunnelData = (mirror = false, invert = false): FunnelData[] => {
  const totalCVEs = mockFunnelData.length;
  const reachableCVEs = mockFunnelData.filter(cve => cve.reachable).length;
  const highImpactCVEs = mockFunnelData.filter(cve => cve.reachable && cve.businessImpact === 'high').length;

  const data = [
    { name: 'All Critical CVEs', value: totalCVEs },
    { name: 'Reachable CVEs', value: reachableCVEs },
    { name: 'High Impact Reachable CVEs', value: highImpactCVEs },
  ];

  const adjustedData = invert ? data.map(d => ({ ...d, value: -d.value })) : data;

  return mirror ? adjustedData.reverse() : adjustedData;
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const displayValue = Math.abs(payload[0].value as number);
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
        <p>{`Value: ${displayValue}`}</p>
      </div>
    );
  }
  return null;
};

const FunnelChartComponent: React.FC<{ mirror?: boolean }> = ({ mirror = false }) => {
  const data = prepareFunnelData(mirror);
  const invertedData = prepareFunnelData(mirror, true);

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorFunnel1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6600" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffcc00" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorFunnel2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff0000" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#ff6600" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="name" />
          <YAxis type="number" domain={[-60, 60]} tick={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ff6600"
            fill="url(#colorFunnel1)"
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ff0000"
            fill="url(#colorFunnel2)"
            strokeWidth={2}
            dot={false}
            activeDot={false}
            data={invertedData}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FunnelChartComponent;
