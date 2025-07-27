// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
// import { Box, Typography, Button, Container, Grid } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { TestResult } from 'mocks/testResultsMockData';
// import { Bar, Line } from 'react-chartjs-2';
// import { PointElement } from 'chart.js';
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import DiffViewer from 'react-diff-viewer';

// Chart.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// interface MitigationAndResultsProps {
//   testResults?: TestResult | null;
//   onBack: () => void;
//   onSeeTests: () => void;
// }
// const filterPassFailDifferences = (data: any) => {
//   return data.filter((item: any) => item.oldVersion !== item.newVersion);
// };

// const prepareChartData = (
//   data: any,
//   type:
//     | 'passFail'
//     | 'performance'
//     | 'payload'
//     | 'passRate'
//     | 'responseTime'
//     | 'throughput'
//     | 'historical'
//     | 'memory'
//     | 'cpu'
//     | 'responseTimeHistorical',
// ) => {
//   const tension =
//     type === 'historical' ||
//       type === 'memory' ||
//       type === 'cpu' ||
//       type === 'responseTimeHistorical'
//       ? 0.4
//       : 0.0;

//   if (type === 'memory') {
//     return {
//       labels: data.map((item: any) => item.time),
//       datasets: [
//         {
//           label: 'Old Memory Usage (MB)',
//           data: data.map((item: any) => item.oldMemoryUsage),
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           tension,
//         },
//         {
//           label: 'New Memory Usage (MB)',
//           data: data.map((item: any) => item.newMemoryUsage),
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//           tension,
//         },
//       ],
//     };
//   } else if (type === 'cpu') {
//     return {
//       labels: data.map((item: any) => item.time),
//       datasets: [
//         {
//           label: 'Old CPU Usage (%)',
//           data: data.map((item: any) => item.oldCpuUsage),
//           backgroundColor: 'rgba(153, 102, 255, 0.2)',
//           borderColor: 'rgba(153, 102, 255, 1)',
//           borderWidth: 1,
//           tension,
//         },
//         {
//           label: 'New CPU Usage (%)',
//           data: data.map((item: any) => item.newCpuUsage),
//           backgroundColor: 'rgba(255, 159, 64, 0.2)',
//           borderColor: 'rgba(255, 159, 64, 1)',
//           borderWidth: 1,
//           tension,
//         },
//       ],
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: 50, // Adjust as needed to widen the Y-axis range
//           },
//         },
//       },
//     };
//   } else if (type === 'payload') {
//     return {
//       labels: data.map((item: any) => item.endpoint),
//       datasets: [
//         {
//           label: 'Old Payload',
//           data: data.map((item: any) => item.oldPayload),
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//         },
//         {
//           label: 'New Payload',
//           data: data.map((item: any) => item.newPayload),
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };
//   } else if (type === 'responseTimeHistorical') {
//     return {
//       labels: data.map((item: any) => item.time),
//       datasets: [
//         {
//           label: 'Old Response Time (ms)',
//           data: data.map((item: any) => item.oldResponseTime),
//           backgroundColor: 'rgba(255, 159, 64, 0.2)',
//           borderColor: 'rgba(255, 159, 64, 1)',
//           borderWidth: 1,
//           tension,
//         },
//         {
//           label: 'New Response Time (ms)',
//           data: data.map((item: any) => item.newResponseTime),
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           tension,
//         },
//       ],
//     };
//   } else if (type === 'passFail' || type === 'responseTime') {
//     return {
//       labels: data.map((item: any) => item.description || item.metric),
//       datasets: [
//         {
//           label: 'Old Version',
//           data: data.map((item: any) =>
//             type === 'passFail'
//               ? item.oldVersion === 'Pass'
//                 ? 1
//                 : 0
//               : item.oldValue,
//           ),
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//         },
//         {
//           label: 'New Version',
//           data: data.map((item: any) =>
//             type === 'passFail'
//               ? item.newVersion === 'Pass'
//                 ? 1
//                 : 0
//               : item.newValue,
//           ),
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };
//   } else if (type === 'passRate') {
//     const oldPassRate =
//       data.filter((item: any) => item.oldVersion === 'Pass').length /
//       data.length;
//     const newPassRate =
//       data.filter((item: any) => item.newVersion === 'Pass').length /
//       data.length;
//     return {
//       labels: ['Pass Rate'],
//       datasets: [
//         {
//           label: 'Old Version',
//           data: [oldPassRate],
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//         },
//         {
//           label: 'New Version',
//           data: [newPassRate],
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };
//   } else if (type === 'throughput') {
//     return {
//       labels: data.map((item: any) => item.time),
//       datasets: [
//         {
//           label: 'Old Version',
//           data: data.map((item: any) => item.oldRequestsPerMinute),
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//           tension: 0.5,
//         },
//         {
//           label: 'New Version',
//           data: data.map((item: any) => item.newRequestsPerMinute),
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//           tension: 0.5,
//         },
//       ],
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             suggestedMax: 100, // Adjust as needed to widen the Y-axis range
//           },
//         },
//       },
//     };
//   } else if (type === 'historical') {
//     return {
//       labels: data.map((item: any) => item.time),
//       datasets: [
//         {
//           label: 'Memory Usage (MB)',
//           data: data.map((item: any) => item.memoryUsage),
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//           tension: 0.5,
//         },
//         {
//           label: 'CPU Usage (%)',
//           data: data.map((item: any) => item.cpuUsage),
//           backgroundColor: 'rgba(153, 102, 255, 0.2)',
//           borderColor: 'rgba(153, 102, 255, 1)',
//           borderWidth: 1,
//           tension: 0.5,
//         },
//         {
//           label: 'Response Time (ms)',
//           data: data.map((item: any) => item.responseTime),
//           backgroundColor: 'rgba(255, 159, 64, 0.2)',
//           borderColor: 'rgba(255, 159, 64, 1)',
//           borderWidth: 1,
//           tension: 0.5,
//         },
//       ],
//     };
//   } else {
//     return {
//       labels: data.map((item: any) => item.metric || item.endpoint),
//       datasets: [
//         {
//           label: 'Old Version',
//           data: data.map((item: any) => item.oldValue || item.oldPayload),
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1,
//         },
//         {
//           label: 'New Version',
//           data: data.map((item: any) => item.newValue || item.newPayload),
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };
//   }
// };

// // const renderPayloadDiff = (oldPayload: string, newPayload: string) => {
// //   const diff = diffWords(oldPayload, newPayload);
// //   const htmlDiff = Diff2Html.getPrettyHtml(diff);
// //   return <div dangerouslySetInnerHTML={{ __html: htmlDiff }} />;
// // };

// const defaultChartOptions = {
//   plugins: {
//     datalabels: {
//       display: false,
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         autoSkip: true,
//       },
//     },
//   },
// };

// const MitigationAndResults: React.FC<MitigationAndResultsProps> = ({
//   testResults,
//   onBack,
// }) => {
//   if (!testResults) {
//     return (
//       <Box className="defaultPage step4Page">
//         <Typography variant="h6">
//           No test results available. Please complete the previous steps first.
//         </Typography>
//         <Button variant="contained" onClick={onBack}>
//           Back
//         </Button>
//       </Box>
//     );
//   }
//   const passFailDifferences = filterPassFailDifferences(testResults.passFailComparison);

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" sx={{ color: 'blue' }}>
//         Mitigation and Tests Results
//       </Typography>

//       <Grid container spacing={3}>

//         <Grid item xs={12}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>Pass/Fail Comparison</Typography>
//           <DataGrid
//             rows={passFailDifferences.map((item: any, index: number) => ({
//               id: index,
//               description: item.description,
//               oldVersion: item.oldVersion,
//               newVersion: item.newVersion,
//             }))}
//             columns={[
//               { field: 'description', headerName: 'Test Description', width: 300 },
//               { field: 'oldVersion', headerName: 'Old Version Result', width: 300 },
//               { field: 'newVersion', headerName: 'New Version Result', width: 300 },
//             ]}
//             autoHeight
//           />
//         </Grid>

//         {/* <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Pass/Fail Comparison
//           </Typography>
//           <Bar
//             key="passFailChart"
//             data={prepareChartData(testResults.passFailComparison, 'passFail')}
//           />
//         </Grid> */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Service Throughput
//           </Typography>
//           <Line
//             key="throughputChart"
//             data={prepareChartData(
//               testResults.throughputComparison,
//               'throughput',
//             )}
//             options={defaultChartOptions}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Prefered Periods To Deploy Service
//           </Typography>
//           <DataGrid
//             rows={testResults.inactivityPeriods}
//             columns={[
//               { field: 'id', headerName: 'ID', width: 150 },
//               { field: 'day', headerName: 'Day', width: 200 },
//               { field: 'hour', headerName: 'Hour', width: 200 },
//             ]}
//             autoHeight
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Memory Usage
//           </Typography>
//           <Line
//             key="memoryChart"
//             data={prepareChartData(testResults.historicalMetrics, 'memory')}
//             options={defaultChartOptions}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             CPU Usage
//           </Typography>
//           <Line
//             key="cpuChart"
//             data={prepareChartData(testResults.historicalMetrics, 'cpu')}
//             options={defaultChartOptions}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Response Time
//           </Typography>
//           <Line
//             key="responseTimeHistoricalChart"
//             data={prepareChartData(
//               testResults.historicalMetrics,
//               'responseTimeHistorical',
//             )}
//             options={defaultChartOptions}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Payload Comparison
//           </Typography>
//           {testResults.payloadComparison.map(
//             ({ oldPayload, newPayload }, index) => (
//               <div key={index} style={{ marginBottom: '20px' }}>
//                 <DiffViewer
//                   oldValue={oldPayload}
//                   newValue={newPayload}
//                   splitView={true}
//                 />
//               </div>
//             ),
//           )}
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Avg Performance Benchmark Comparison
//           </Typography>
//           <Bar
//             key="performanceChart"
//             data={prepareChartData(
//               testResults.performanceComparison,
//               'performance',
//             )}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ color: 'blue' }}>
//             Avg Response Time by Endpoint
//           </Typography>
//           <Bar
//             key="responseTimeChart"
//             data={prepareChartData(
//               testResults.responseTimeComparison,
//               'responseTime',
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginTop: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               onClick={onBack}
//               sx={{ borderRadius: '50px' }}
//             >
//               See Generated Tests
//             </Button>
//             <Button
//               variant="contained"
//               onClick={onBack}
//               sx={{ borderRadius: '50px' }}
//             >
//               Create PR and Deploy
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//       {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
//         <Button variant="contained" onClick={onBack} sx={{ borderRadius: '50px' }}>Back</Button>
//         <Button variant="contained" onClick={onSeeTests} sx={{ borderRadius: '50px' }}>See Tests</Button>
//       </Box> */}
//     </Container>
//   );
// };

// export default MitigationAndResults;

 export { };
