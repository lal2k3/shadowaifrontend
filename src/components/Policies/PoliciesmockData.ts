export const PoliciesmockData: {
    policyName: string;
    givenConditions: string[];
    riskScore: string;
    confidenceScore: number;
    doActions: string[];
    appliesTo: string;
    reoccurrenceNumber: number;
    reoccurrenceUnit: string;
} = {
    policyName: "",
    givenConditions: [],
    riskScore: "Critical",
    confidenceScore: 100,
    doActions: [],
    appliesTo: "All repos",
    reoccurrenceNumber: 1,
    reoccurrenceUnit: "Days",
};



export default PoliciesmockData;