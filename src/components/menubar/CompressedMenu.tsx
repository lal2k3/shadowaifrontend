import { Box, Drawer } from '@mui/material';
import { IoMenu } from 'react-icons/io5';
import MenuItems from './MenuItems';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'store/reducers';
import { setSideMenuOpen } from 'store/reducers/general';
import { AppConfig } from 'components/general/AppConfig';

const CompressedMenu = () => {
  const showMenu = useSelector(
    (state: IRootState) => state.general.sidemenu.open,
  );
  const dispatch = useDispatch();

  return (
    <Box>
      <Box onClick={() => dispatch(setSideMenuOpen(!showMenu))}>
        <IoMenu
          className="compress-main-icon"
          style={{ fontSize: '3vh', paddingTop: '6px' }}
        />
      </Box>
      <Drawer
        open={showMenu}
        anchor={AppConfig.menuAnchor}
        onClose={() => dispatch(setSideMenuOpen(false))}
      >
        <Box
          sx={{
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '50px',
            gap: '15px',
          }}
        >
          <MenuItems mode="compress" />
        </Box>
      </Drawer>
    </Box>
  );
};

export default CompressedMenu;
