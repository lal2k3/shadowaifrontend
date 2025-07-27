// mocks/mockRecapData.ts
export interface RecapData {
  totalCVEs: number;
  zeroDaysFound: number;
  newCVEsFound: number;
  newZeroDays: number;
  critical: number;
  high: number;
  reachable: number;
  [key: string]: number | string;
}

const mockRecapData: RecapData = {
  totalCVEs: 12540,
  zeroDaysFound: 5,
  newCVEsFound: 26,
  newZeroDays: 1,
  reachable: 500,
  critical: 150,
  high: 300,
  medium: 500,
  low: 25,
  pLoss: '2.5M',
};

export default mockRecapData;
