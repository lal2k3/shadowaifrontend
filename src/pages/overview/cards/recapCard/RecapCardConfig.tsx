import {
  FlatlineChartOptions,
  FlatlineChatData,
} from 'components/charts/FlatlineChart/FlatlineChart';

export const cveData: FlatlineChatData = {
  labels: ['Critical', 'High', 'Medium', 'Low'],
  values: [15, 6, 21, 30],
};

export const cveOptions: FlatlineChartOptions = {
  colors: [
    'rgba(255, 51, 51, 0.5)',
    'rgba(255, 153, 0, 0.5)',
    'rgba(230, 230, 0, 0.4)',
    'rgba(0, 204, 255, 0.5)',
  ],
  gap: '5px',
  thinkness: '25px',
  showValues: 'values',
};

export const fixesData: FlatlineChatData = {
  labels: ['Immediate', 'Fast', 'Inspect', 'Low'],
  values: [70, 130, 33],
};

export const fixesOptions: FlatlineChartOptions = {
  colors: ['#17d54a', '#2e8044a8', '#93ad0570'],
  gap: '5px',
  thinkness: '25px',
  showValues: 'values',
};
