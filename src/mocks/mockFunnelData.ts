// src/mockFunnelData.ts
interface CVE {
    id: string;
    score: number;
    reachable: boolean;
    businessImpact: 'high' | 'mid' | 'low';
  }
  
  const generateMockData = (): CVE[] => {
    const data: CVE[] = [];
  
    for (let i = 1; i <= 50; i++) {
      data.push({
        id: `CVE-2024-${i.toString().padStart(4, '0')}`,
        score: 9 + Math.random(), // Generating a random score between 9 and 10
        reachable: Math.random() < 0.5, // Generating a random boolean value
        businessImpact: ['high', 'mid', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'mid' | 'low',
      });
    }
  
    return data;
  };
  
  const mockFunnelData = generateMockData();
  
  export default mockFunnelData;
  