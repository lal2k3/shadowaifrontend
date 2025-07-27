import { RisksByDepartment } from 'components/charts/RisksByDepartment';
import CustomCard from 'components/customCard/CustomCard';
import { FiArchive } from "react-icons/fi";

const RisksByDepartmentCard = () => {
  return (
    <CustomCard
      className="cveDoughnutCard homepagecard"
      title="Risk By Department"
      titleLogo={<FiArchive />}
    >
      <RisksByDepartment />
    </CustomCard>
  );
};

export default RisksByDepartmentCard;
