import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../contexts';

interface BasePageLayoutProps {
  title: string;
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
export const BasePageLayout: React.FC<BasePageLayoutProps> = ({ children, title }) => {
  const lessThanSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();
  
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >
      <Box padding={1} display="flex" alignItems="center" height={theme.spacing(12)} >
        {lessThanSm &&(
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography variant="h5">
          {title}
        </Typography>
      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}  
      </Box>
    </Box>
  );
};