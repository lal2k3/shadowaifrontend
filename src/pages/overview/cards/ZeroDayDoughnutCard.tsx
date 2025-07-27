import { ZeroDayDoughnut } from 'components/charts/ZeroDaysDoughnut';
import CustomCard from 'components/customCard/CustomCard';
import { TbUrgent } from 'react-icons/tb';

const ZeroDayDoughnutCard = () => {
  return (
    <CustomCard
      className="cveDoughnutCard"
      title="ZeroDays overview"
      titleLogo={<TbUrgent />}
    >
      <ZeroDayDoughnut />
    </CustomCard>
  );
};

export default ZeroDayDoughnutCard;
