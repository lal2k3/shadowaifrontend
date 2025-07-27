import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  title?: string;
  titleLogo?: ReactNode;
  titleClassName?: string;
}

const renderTitle = (
  title: string,
  titleLogo: ReactNode,
  titleClassName: string,
) => {
  if (title !== undefined) {
    return (
      <Box className={`card-title ${titleClassName}`}>
        {titleLogo !== undefined ? titleLogo : undefined}
        {title}
      </Box>
    );
  }
};

const CustomCard = ({
  children,
  className,
  title,
  titleLogo,
  titleClassName,
}: Props) => {
  return (
    <Box className={`defaultCard ${className}`}>
      {renderTitle(title, titleLogo, titleClassName)}
      {children}
    </Box>
  );
};

export default CustomCard;
