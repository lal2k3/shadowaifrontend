// src/components/AlertsRecapCard.tsx
import { Box } from '@mui/material';
import CustomCard from 'components/customCard/CustomCard';
import { ReactNode } from 'react';
import { PiShieldWarning } from 'react-icons/pi';
import { MdOutlineWifiFind } from 'react-icons/md';
import { TfiStatsUp } from 'react-icons/tfi';
import { IoIosAlert } from "react-icons/io";
import { MdNewReleases } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

import SummaryIcon from './summaryCard/SummaryIcon';

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

const AlertsRecapCard = () => {
  return (
    <CustomCard
      className="recapcard homepagecard"
      title="Alerts recap"
      titleLogo={<TfiStatsUp />}
    >
      <CustomCard className="recapcardrow">
        <Box className="recapcardcell">
          <SummaryIcon icon={<IoIosAlert />} bgcolor={'rgba(255,165,0, 1)'} />
          Alerts
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<MdOutlineWifiFind color="#f2f2f2" />}
            text="Total Alerts"
            value={247}
            bgColor="rgba(255,165,0, 1)"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<PiShieldWarning color="#f2f2f2" />}
            text="Critical"
            value={42}
            bgColor="rgba(255,140,0, 1)"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<FaBell color="#f2f2f2" />}
            text="High"
            value={89}
            bgColor="rgba(255,120,0, 1)"
          />
        </Box>
      </CustomCard>
      <CustomCard className="recapcardrow">
        <Box className="recapcardcell">
          <SummaryIcon icon={<TbProgress />} bgcolor={'#2196F3'} />
          Status
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<MdNewReleases color="#f2f2f2" />}
            text="New"
            value={76}
            bgColor="#FF5722"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<TbProgress color="#f2f2f2" />}
            text="In Progress"
            value={134}
            bgColor="#2196F3"
          />
        </Box>
        <Box className="recapcardcell leftborder">
          <Stat
            logo={<IoShieldCheckmark color="#f2f2f2" />}
            text="Mitigated"
            value={37}
            bgColor="#4CAF50"
          />
        </Box>
      </CustomCard>
    </CustomCard>
  );
};

export default AlertsRecapCard;