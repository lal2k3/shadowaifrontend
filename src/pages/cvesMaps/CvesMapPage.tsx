import { Box } from '@mui/material';
import CustomMap from 'components/maps/CustomMap';
import CustomCard from 'components/customCard/CustomCard';
import { useParams } from 'react-router-dom';

const CloudSystemPage = () => {
  let { mapId } = useParams();
  mapId = mapId ?? 'default';

  return (
    <Box className="defaultPage cvesMapPage">
      <Box className="cvesMapPageRow">
        <CustomCard
          className="customMapCard"
          title="CVEs Map"
          titleClassName="customMapCardTitle"
        >
          <CustomMap mapId={mapId} />
        </CustomCard>
      </Box>
    </Box>
  );
};

export default CloudSystemPage;
