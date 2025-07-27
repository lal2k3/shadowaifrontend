import { CveFlatline } from 'components/charts/CveFlatline';
import CustomCard from 'components/customCard/CustomCard';
import { PiShieldWarningBold } from 'react-icons/pi';

const CveFlatlineCard = () => {
  return (
    <CustomCard
      className="cveDoughnutCard"
      title="CVEs overview"
      titleLogo={<PiShieldWarningBold />}
    >
      <CveFlatline />
    </CustomCard>
  );
};

export default CveFlatlineCard;
