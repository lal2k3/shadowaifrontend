import FlatlineChart from 'components/charts/FlatlineChart/FlatlineChart';
import CustomCard from 'components/customCard/CustomCard';
import { TfiStatsUp } from 'react-icons/tfi';
import {
  cveData,
  cveOptions,
  fixesData,
  fixesOptions,
} from './RecapCardConfig';
import { AppConfig } from 'components/general/AppConfig';

const RecapCard = () => {
  return (
    <CustomCard
      className="recapcardflat"
      title={`${AppConfig.appName} recap`}
      titleLogo={<TfiStatsUp />}
    >
      <CustomCard className="row">
        CVEs
        <FlatlineChart options={cveOptions} data={cveData} />
      </CustomCard>
      <CustomCard className="row">
        Fixes
        <FlatlineChart options={fixesOptions} data={fixesData} />
      </CustomCard>
    </CustomCard>
  );
};

export default RecapCard;
