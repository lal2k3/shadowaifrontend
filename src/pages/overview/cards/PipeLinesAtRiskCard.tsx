import { TopPipelineAtRisk } from 'components/charts/TopPipelinesAtRisk';
import CustomCard from 'components/customCard/CustomCard';
import { LuCircleDollarSign } from 'react-icons/lu';

const PipeLinesAtRiskCard = () => {
  return (
    <CustomCard
      className="piplelinesCard"
      title="Top Pipelines at Risk"
      titleLogo={<LuCircleDollarSign />}
    >
      <TopPipelineAtRisk />
    </CustomCard>
  );
};

export default PipeLinesAtRiskCard;
