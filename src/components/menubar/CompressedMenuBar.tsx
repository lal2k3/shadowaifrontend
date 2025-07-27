import { Box } from '@mui/material';
import MenuItem from './MenuItem';
import { MenuLogoTag } from './MenuBar';
import CompressedMenu from './CompressedMenu';
import { AppConfig } from 'components/general/AppConfig';

const CompressedMenuBar = () => {
  return (
    <Box
      className={`compressedmenu ${AppConfig.dir} ${AppConfig.mode}`}
      sx={{
        direction: AppConfig.dir
      }}
    >
      <MenuItem
        content={MenuLogoTag('compress')}
        mode="compressed-top-level"
        url="/"
      />
      <CompressedMenu />
    </Box>
  );
};

export default CompressedMenuBar;
