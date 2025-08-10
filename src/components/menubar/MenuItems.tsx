import { MenuLogoTag } from './MenuBar';
import MenuItem from './MenuItem';
import { IoSpeedometerOutline } from 'react-icons/io5';
//import { PiShieldWarningBold } from 'react-icons/pi';
import { TbPuzzle2 } from 'react-icons/tb';
//import { IoMedkitOutline } from 'react-icons/io5';
//import { TbTopologyStar3 } from 'react-icons/tb';
import { RiFileList3Line, RiRobotLine, RiHeartLine } from 'react-icons/ri';
import { AppConfig } from 'components/general/AppConfig';
//import { LuHandshake } from "react-icons/lu";

export type MenuMode =
  | 'compress'
  | 'standard'
  | 'compressed-top-level'
  | 'icons-only';

interface Props {
  mode: MenuMode;
}

const MenuItems = ({ mode }: Props) => {
  return (
    <>
      <MenuItem
        icon={MenuLogoTag('standard')}
        content={AppConfig.appName}
        url="/"
        mode={mode}
        type="logo"
      />
      <MenuItem
        content="Overview"
        icon={<IoSpeedometerOutline />}
        url="/"
        mode={mode}
        title="Overview"
      />
      <MenuItem
        content="Policies"
        icon={<RiFileList3Line />}
        url="/policies"
        mode={mode}
        title="Policies"
      />
      <MenuItem
        content="Agents"
        icon={<RiRobotLine />}
        url="/agents"
        mode={mode}
        title="Agents"
      />
      <MenuItem
        content="Heartbeats"
        icon={<RiHeartLine />}
        url="/heartbeats"
        mode={mode}
        title="Heartbeats"
      />
      {/*<MenuItem
        content="Remediation"
        icon={<IoMedkitOutline />}
        url="/remediation"
        mode={mode}
        title="Remediation"
      />*/}
      {/*<MenuItem
        content="CVEs Map"
        icon={<TbTopologyStar3 />}
        url="/cvesmap"
        mode={mode}
        title="CVEs Map"
      />*/}
      <MenuItem
        content="Integrations"
        icon={<TbPuzzle2 />}
        url="/integrations"
        mode={mode}
        title="Integrations"
      />
    </>
  );
};

export default MenuItems;
