import { TopAIModels } from 'components/charts/TopAIModels';
import CustomCard from 'components/customCard/CustomCard';
import { PiRobotBold } from 'react-icons/pi';

const TopAIModelsCard = () => {
  return (
    <CustomCard
      className="piplelinesCard homepagecard"
      title="Top AI Models"
      titleLogo={<PiRobotBold />}
    >
      <TopAIModels />
    </CustomCard>
  );
};

export default TopAIModelsCard;