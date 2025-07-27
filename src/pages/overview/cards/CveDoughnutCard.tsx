import { CveDoughnut } from 'components/charts/CveDoughnut';
import CustomCard from 'components/customCard/CustomCard';
import { PiShieldWarningBold } from 'react-icons/pi';

const CveDoughnutCard = () => {
  return (
    <CustomCard
      className="cveDoughnutCard"
      title="CVEs overview"
      titleLogo={<PiShieldWarningBold />}
    >
      <CveDoughnut />
    </CustomCard>
  );
};

export default CveDoughnutCard;
