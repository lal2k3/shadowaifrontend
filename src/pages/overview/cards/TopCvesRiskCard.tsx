import { TopPackagesAtRisk } from 'components/charts/TopPackagesAtRisk';
import CustomCard from 'components/customCard/CustomCard';
import { PiShieldWarningBold } from 'react-icons/pi';

const TopCvesRiskCard = () => {
  return (
    <CustomCard
      className="piplelinesCard homepagecard"
      title="Top Packages at Risk"
      titleLogo={<PiShieldWarningBold />}
    >
      <TopPackagesAtRisk />
    </CustomCard>
  );
};

export default TopCvesRiskCard;
