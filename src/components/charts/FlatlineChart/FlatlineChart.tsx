import { Box } from '@mui/material';
import { ReactNode } from 'react';

export type FlatlineChatData = {
  labels: string[];
  values: number[];
};

export type FlatlineChartOptions = {
  colors?: string[];
  thinkness?: string;
  gap?: string;
  borderRadius?: string;
  showLabels?: boolean;
  showValues?: 'none' | 'percentage' | 'values';
};

const DEFAULT_VALUES: FlatlineChartOptions = {
  colors: ['yellow', 'red', 'blue', 'green', 'orange'],
  thinkness: '20px',
  gap: '0px',
  borderRadius: '7px',
  showLabels: true,
  showValues: 'none',
};

interface Props {
  data: FlatlineChatData;
  options: FlatlineChartOptions;
  className?: string;
}

const FlatlineChart = ({ data, options, className }: Props) => {
  const sum = data.values.reduce((partialSum, a) => partialSum + a, 0);

  const getValue = (value: number) => {
    let returnedValue = undefined;
    if (options.showValues !== 'none') {
      if (options.showValues === 'percentage') {
        returnedValue = `${((value / sum) * 100).toFixed(2)}%`;
      } else if (options.showValues === 'values') {
        returnedValue = value;
      }
    }

    return returnedValue;
  };

  const renderValues = () => {
    const valueNodes: ReactNode[] = [];

    data.values.forEach((value, index) => {
      valueNodes.push(
        <Box
          key={`flatline-chart-${index}`}
          sx={{
            flex: `${((value / sum) * 100).toString()}%`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              options.colors[index] ?? DEFAULT_VALUES.colors[index],
            height: options.thinkness ?? DEFAULT_VALUES.thinkness,
            borderTopLeftRadius:
              index === 0
                ? options.borderRadius ?? DEFAULT_VALUES.borderRadius
                : undefined,
            borderBottomLeftRadius:
              index === 0
                ? options.borderRadius ?? DEFAULT_VALUES.borderRadius
                : undefined,
            borderTopRightRadius:
              index === data.values.length - 1
                ? options.borderRadius ?? DEFAULT_VALUES.borderRadius
                : undefined,
            borderBottomRightRadius:
              index === data.values.length - 1
                ? options.borderRadius ?? DEFAULT_VALUES.borderRadius
                : undefined,
          }}
        >
          {getValue(value)}
        </Box>,
      );
    });

    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: options.gap ?? DEFAULT_VALUES.gap,
        }}
      >
        {valueNodes}
      </Box>
    );
  };

  const renderLables = () => {
    const valueNodes: ReactNode[] = [];

    data.values.forEach((value, index) => {
      valueNodes.push(
        <Box
          key={`flatline-chart-label-${index}`}
          sx={{
            flex: `${((value / sum) * 100).toString()}%`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data.labels[index]}
        </Box>,
      );
    });

    if (options.showLabels ?? DEFAULT_VALUES.showLabels) {
      return (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: options.gap ?? DEFAULT_VALUES.gap,
          }}
        >
          {valueNodes}
        </Box>
      );
    } else {
      return undefined;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '5px',
      }}
      className={className}
    >
      {renderValues()}
      {renderLables()}
    </Box>
  );
};

export default FlatlineChart;
