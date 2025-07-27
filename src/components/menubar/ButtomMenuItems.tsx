import MenuItem from './MenuItem';
import { HiOutlineCog } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";

export type MenuMode =
  | 'compress'
  | 'standard'
  | 'compressed-top-level'
  | 'icons-only';

interface Props {
  mode: MenuMode;
}

const BottomMenuItems = ({ mode }: Props) => {
  return (
    <>
      <MenuItem
        content="Settings"
        icon={<HiOutlineCog />}
        url="/settings"
        mode={mode}
        title="Settings"
      />
      <MenuItem
        content="Logout"
        icon={<RiLogoutCircleLine />}
        url="/logout"
        mode={mode}
        title="Logout"
      />
    </>
  );
};

export default BottomMenuItems;
