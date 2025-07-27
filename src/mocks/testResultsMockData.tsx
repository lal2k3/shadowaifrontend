// src/mocks/testResultsMockData.ts

interface TestComparison {
  id: string;
  description: string;
  oldVersion: string;
  newVersion: string;
  status: 'Pass' | 'Fail';
}

interface PerformanceMetric {
  id: string;
  metric: string;
  oldValue: number;
  newValue: number;
  change: string;
}

interface PayloadComparison {
  id: string;
  endpoint: string;
  oldPayload: string;
  newPayload: string;
}

interface ThroughputMetric {
  time: string;
  oldRequestsPerMinute: number;
  newRequestsPerMinute: number;
}

interface InactivityPeriod {
  id: string;
  day: string;
  hour: string;
}

interface HistoricalMetric {
  time: string;
  oldMemoryUsage: number;
  newMemoryUsage: number;
  oldCpuUsage: number;
  newCpuUsage: number;
  oldResponseTime: number;
  newResponseTime: number;
}
export interface BuildResult {
  status: 'Pass' | 'Fail';
}
export interface TestResult {
  passFailComparison: TestComparison[];
  performanceComparison: PerformanceMetric[];
  payloadComparison: PayloadComparison[];
  responseTimeComparison: PerformanceMetric[];
  throughputComparison: ThroughputMetric[];
  inactivityPeriods: InactivityPeriod[];
  historicalMetrics: HistoricalMetric[];
  buildResult:BuildResult;
}

const generateTestResult = (differences: boolean): TestResult => {
  const getRandomFailStatus = () => {
    const failRate = Math.random() * 0.3 + 0.2; 
    return Math.random() < failRate ? 'Fail' : 'Pass';
  };
  const buildResult: BuildResult = {
    status: 'Pass'
    // status: differences ? 'Fail' : 'Pass',
  };

  const passFailComparison: TestComparison[] = Array.from({ length: 10 }, (_, id) => ({
    id: `${id + 1}`,
    description: `Test ${id + 1}`,
    oldVersion: 'Pass',
    newVersion: differences ? getRandomFailStatus() : 'Pass',
    status: differences ? 'Fail' : 'Pass',
  }));

  const performanceComparison: PerformanceMetric[] = [
    { id: '1', metric: "Response Time (ms)", oldValue: 250, newValue: differences ? 260 : 250, change: differences ? "+10" : "0" },
    { id: '2', metric: "Memory Usage (MB)", oldValue: 500, newValue: differences ? 550 : 500, change: differences ? "+50" : "0" },
    { id: '3', metric: "CPU Usage (%)", oldValue: 25, newValue: 25, change: "0" },
  ];

  const payloadComparison: PayloadComparison[] = [
    { id: '1', endpoint: "/api/data/transform", oldPayload: `{'data': 'raw_data.csv', 'operation': 'clean'}`, newPayload: `{'data': 'cleaned_data.csv', 'operation': 'clean'}` },
    { id: '2', endpoint: "/api/data/analyze", oldPayload: `{'data': 'cleaned_data.csv', 'analysis_type': 'summary'}`, newPayload: `{'data': 'cleaned_data.csv', 'analysis_type': 'detailed'}` },
    { id: '3', endpoint: "/api/data/report", oldPayload: `{'report_id': '7890', 'format': 'pdf'}`, newPayload: `{'report_id': '7890', 'format': 'docx'}` },
  ];

  const responseTimeComparison: PerformanceMetric[] = Array.from({ length: 10 }, (_, id) => ({
    id: `${id + 1}`,
    metric: `Response Time for Endpoint ${id + 1} (ms)`,
    oldValue: 150 + id * 10,
    newValue: differences ? 150 + id * 10 + 10 : 150 + id * 10,
    change: differences ? `+10` : `0`
  }));

  const throughputComparison: ThroughputMetric[] = Array.from({ length: 20 }, (_, id) => {
    const time = `${Math.floor(id / 2)}:${id % 2 === 0 ? '00' : '30'}`;
    const baseThroughput = 100; // קו ישר יותר סביב הערך הבסיסי
    return {
      time,
      oldRequestsPerMinute: baseThroughput + (Math.random() * 10 - 5), // ערכים סביב הבסיס
      newRequestsPerMinute: differences ? baseThroughput + (Math.random() * 10 - 5) : baseThroughput + (Math.random() * 10 - 5),
    };
  });

  const inactivityPeriods: InactivityPeriod[] = [
    { id: '1', day: 'Sunday', hour: '00:00-01:00' },
    { id: '2', day: 'Monday', hour: '03:00-04:00' },
    { id: '3', day: 'Tuesday', hour: '04:00-05:00' },
    { id: '4', day: 'Wednesday', hour: '02:00-03:00' },
    { id: '5', day: 'Thursday', hour: '01:00-02:00' },
  ];

  const historicalMetrics: HistoricalMetric[] = Array.from({ length: 20 }, (_, id) => {
    const time = `${Math.floor(id / 2)}:${id % 2 === 0 ? '00' : '30'}`;
    return {
      time,
      oldMemoryUsage: 500 + Math.random() * 5 - 2.5,
      newMemoryUsage: differences ? 600 + Math.random() * 5 - 2.5 : 500 + Math.random() * 2.5 - 1.25,
      oldCpuUsage: 25 + Math.random() * 1 - 0.5,
      newCpuUsage: 25 + Math.random() * 1 - 0.5,
      oldResponseTime: 200 + Math.random() * 5 - 2.5,
      newResponseTime: differences ? 250 + Math.random() * 5 : 200 + Math.random() * 5 - 2.5,
    };
  });

  return {
    buildResult,
    passFailComparison,
    performanceComparison,
    payloadComparison,
    responseTimeComparison,
    throughputComparison,
    inactivityPeriods,
    historicalMetrics,
    
  };
};

export const testResultsWithDifferences: TestResult = generateTestResult(true);
export const testResultsWithoutDifferences: TestResult = generateTestResult(false);
