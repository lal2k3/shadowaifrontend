// src/components/RecapCard.tsx
import { Box } from '@mui/material';
import CustomCard from 'components/customCard/CustomCard';
import { ReactNode } from 'react';
import { PiShieldWarning } from 'react-icons/pi';
import { MdOutlineWifiFind } from 'react-icons/md';
import { AiFillTool } from 'react-icons/ai';
import { TfiStatsUp } from 'react-icons/tfi';
import { ImMagicWand } from "react-icons/im";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
// import { LuCircleDollarSign } from 'react-icons/lu';
//import { TbUrgent } from 'react-icons/tb';

import mockRecapData, { RecapData } from 'mocks/mockRecapData';
import SummaryIcon from './summaryCard/SummaryIcon';
import { TbUrgent } from 'react-icons/tb';
import { AppConfig } from 'components/general/AppConfig';

interface StatsProps {
  logo: ReactNode;
  text: string;
  value: number | string;
  bgColor: string;
}

const Stat = ({ logo, text, value, bgColor }: StatsProps) => {
  return (
    <Box className="stat">
      <Box className="stat-wrapper">
        <Box className="stat-logo">
          <SummaryIcon icon={logo} bgcolor={bgColor} />
        </Box>
        <Box className="value">
          <Box className="stat-title">
            <Box>{text}</Box>
          </Box>
          <Box className="stat-value">{value}</Box>
        </Box>
      </Box>
    </Box>
  );
};

const RecapCardTable = () => {
  const data: RecapData = mockRecapData;
  return (
    <CustomCard
      className="recapcard homepagecard"
      title={`${AppConfig.appName} recap`}
      titleLogo={<TfiStatsUp />}
    >
      <CustomCard className="recapcardrow">
        <Box className="recapcardcell">
          <SummaryIcon icon={<TbUrgent />} bgcolor={'rgba(255,0,0, 1)'} />
          CVEs
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<MdOutlineWifiFind color="#f2f2f2" />}
            text="Total CVEs"
            value={data.totalCVEs}
            bgColor="rgba(215,0,0, 1)"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<PiShieldWarning color="#f2f2f2" />}
            text="Critical"
            value={data.critical}
            bgColor="rgba(175,0,0, 1)"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<PiShieldWarning color="#f2f2f2" />}
            text="High"
            value={data.high}
            bgColor="rgba(135,0,0, 1)"
          />
        </Box>
      </CustomCard>
      <CustomCard className="recapcardrow">
        <Box className="recapcardcell">
          <SummaryIcon icon={<AiFillTool />} bgcolor={'#34A853'} />
          Fixes
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<ImMagicWand color="#f2f2f2" />}
            text="Immediate"
            value={70}
            bgColor="#17d54a"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<IoSpeedometerOutline color="#f2f2f2" />}
            text="Fast"
            value={130}
            bgColor="#2e8044"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<FaMagnifyingGlass color="#f2f2f2" />}
            text="Inspect"
            value={33}
            bgColor="#93ad05"
          />
        </Box>
      </CustomCard>
    </CustomCard>
  );
};

export default RecapCardTable;
