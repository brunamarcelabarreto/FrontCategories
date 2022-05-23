import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface BasePageLayoutProps {
  title: string;
  children: React.ReactNode;
  toolBar?: ReactNode;
}

// eslint-disable-next-line react/prop-types
export const BasePageLayout: React.FC<BasePageLayoutProps> = ({ children, title, toolBar }) => {
  const lessThanSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const lessThanMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();
  
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >
      <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(lessThanSm ? 6 : lessThanMd ? 8 : 12)} >
        {lessThanSm &&(
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography 
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipses"
          variant={lessThanSm ? 'h5' : lessThanMd ? 'h4' : 'h3' }
        >
          {title}
        </Typography>
      </Box>

      {toolBar && (
        <Box>
          {toolBar}
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {children}  
      </Box>
    </Box>
  );
};