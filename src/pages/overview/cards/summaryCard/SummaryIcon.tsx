import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  bgcolor: string;
}

const SummaryIcon = ({ icon, bgcolor }: Props) => {
  return (
    <Box className="summaryicon" sx={{ backgroundColor: bgcolor }}>
      {icon}
    </Box>
  );
};

export default SummaryIcon;
