import { Box } from '@mui/material';
import MenuItems from './MenuItems';
import { AppConfig } from 'components/general/AppConfig';
import BottomMenuItems from './ButtomMenuItems';

const StandardMenuBar = () => {
  return (
    <Box
      className={`standardmenu ${AppConfig.dir} ${AppConfig.mode} ${AppConfig.menuStyle}`}
      sx={{
        direction: AppConfig.dir,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 'fit-content',
        width: 'fit-content',
        padding: '10px 0',
      }}
    >
      <Box className='topitems'>
        <MenuItems mode={AppConfig.menuStyle} />
      </Box>
      <Box className='bottomitems'>
        <BottomMenuItems mode={AppConfig.menuStyle} />
      </Box>
    </Box>
  );
};

export default StandardMenuBar;
