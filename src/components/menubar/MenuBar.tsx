import Logo from 'assets/logo.png';
import useScreenSize from 'hooks/useScreenSize';
import StandardMenuBar from './StandardMenuBar';
import CompressedMenuBar from './CompressedMenuBar';
import { MenuMode } from './MenuItems';
import { AppConfig } from 'components/general/AppConfig';

export const MenuLogoTag = (mode: MenuMode) => (
  <img
    src={Logo}
    style={{
      height: mode === 'standard' ? '48px' : '48px',
      borderRadius: mode === 'standard' ? '64px' : '64px',
      backgroundColor: mode === 'standard' ? '#000' : '#000'
    }}
  />
);

const MenuBar = () => {
  const screenSize = useScreenSize();

  const renderMenu = () => {
    if (screenSize.width <= AppConfig.collapseWidth) {
      return <CompressedMenuBar />;
    } else {
      return <StandardMenuBar />;
    }
  };

  return renderMenu();
};

export default MenuBar;
