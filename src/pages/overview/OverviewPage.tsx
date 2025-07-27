import { Box } from '@mui/material';

//import CveDoughnutCard from './cards/CveDoughnutCard';
//import ZeroDayDoughnutCard from './cards/ZeroDayDoughnutCard';
import TopRiskOwnersCard from './cards/TopRiskOwnersCard';
import RisksByDepartmentCard from './cards/RisksByDepartmentCard';
import TopAIModelsCard from './cards/TopAIModelsCard';
//import SummaryCard from './cards/summaryCard/SummaryCard';
import AlertsRecapCard from './cards/AlertsRecapCard';
//import FunnelCard from './FunnelCard';

const OverviewPage = () => {
  return (
    <Box className="defaultPage homePage">
      {/*<Box className="homePageRow">
        <SummaryCard />
      </Box>*/}
      <Box className="homePageRow">
        <AlertsRecapCard />
        <TopAIModelsCard />
      </Box>
      <Box className="homePageRow finalRow">
        <RisksByDepartmentCard />
        <TopRiskOwnersCard />
      </Box>
      {/*<Box className="homePageRow">
        <FunnelCard />
      </Box>*/}
    </Box>
  );
};

export default OverviewPage;
