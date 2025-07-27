import { TopRiskOwners } from 'components/charts/TopRiskOwners';
import CustomCard from 'components/customCard/CustomCard';
import { FaUserSecret } from "react-icons/fa6";

const TopRiskOwnersCard = () => {
  return (
    <CustomCard
      className="piplelinesCard homepagecard"
      title="Top Risk Owners"
      titleLogo={<FaUserSecret />}
    >
      <TopRiskOwners />
    </CustomCard>
  );
};

export default TopRiskOwnersCard