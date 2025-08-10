import { Box } from '@mui/material';

import HeartbeatsByTypeCard from './cards/HeartbeatsByTypeCard';
import TopAIUsersCard from './cards/TopAIUsersCard';
import TopBlockedUsersCard from './cards/TopBlockedUsersCard';
import TopPlatformsCard from './cards/TopPlatformsCard';
import DepartmentStatsCard from './cards/DepartmentStatsCard';

const OverviewPage = () => {
  return (
    <Box className="defaultPage homePage">
      <Box className="homePageRow">
        <HeartbeatsByTypeCard />
        <TopAIUsersCard />
      </Box>
      <Box className="homePageRow">
        <TopBlockedUsersCard />
        <TopPlatformsCard />
      </Box>
      <Box className="homePageRow finalRow">
        <DepartmentStatsCard />
      </Box>
    </Box>
  );
};

export default OverviewPage;
