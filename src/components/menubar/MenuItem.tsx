import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuMode } from './MenuItems';
import { useDispatch } from 'react-redux';
import { setSideMenuOpen } from 'store/reducers/general';
import { AppConfig } from 'components/general/AppConfig';

interface Props {
  content?: string | ReactNode;
  url?: string;
  children?: ReactNode;
  mode?: MenuMode;
  icon?: ReactNode;
  type?: 'logo' | 'item';
  title?: string;
}

const isSelectedPath = (url: string, location: string) => {
  let isSelected = false;

  if (url === '/') {
    isSelected = url === location;
  } else {
    isSelected = location.startsWith(url);
  }

  return isSelected;
};

const MenuItem = ({
  content,
  url,
  children,
  mode,
  icon,
  type = 'item',
  title
}: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selected =
    mode !== 'compressed-top-level' && isSelectedPath(url, location?.pathname);

  const renderContent = () => {
    if (mode === 'icons-only') {
      return undefined;
    } else {
      return children !== undefined ? children : content;
    }
  };

  return (
    <Box
      className={`menuItem ${
        selected ? 'selected' : 'notselected'
      } ${mode} ${type} ${AppConfig.dir}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: AppConfig.dir,
        padding: '5px 0',
      }}
    >
      <Link
        className={`link ${selected ? 'selected' : 'notselected'} ${mode}`}
        to={url}
        title={title}
        onClick={() => dispatch(setSideMenuOpen(false))}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {icon}
        {renderContent()}
      </Link>
    </Box>
  );
};

export default MenuItem;
