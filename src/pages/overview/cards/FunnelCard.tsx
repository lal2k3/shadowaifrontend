import { Box } from '@mui/material';
import CustomCard from 'components/customCard/CustomCard';
import FunnelChartComponent from 'components/funnel/FunnelChart';
import { AiOutlineFunnelPlot } from 'react-icons/ai';

const FunnelCard = () => {
  return (
    <CustomCard className="funnelCard" title="Funnel Overview" titleLogo={<AiOutlineFunnelPlot />}>
      <Box className="funnelChartContainer">
        <FunnelChartComponent />
      </Box>
    </CustomCard>
  );
};

export default FunnelCard;
