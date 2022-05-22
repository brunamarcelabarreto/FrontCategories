import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../../contexts/UseDrawerContext';
import { useNavigate } from 'react-router-dom';

interface MenuLateralProps {
  children: React.ReactNode
}

interface ListItemLinkProps {
  to: string;
  label: string;
  icon: string;
  onClick: (() => void) | undefined;
}

// eslint-disable-next-line react/prop-types
export const ListItemLink: React.FC<ListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

// eslint-disable-next-line react/prop-types
export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();



  return (
    <>
      <Drawer open={isDrawerOpen} variant={lessThanSm ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{
              height: theme.spacing(8),
              width: theme.spacing(8),
              color: '#000000',
              bgcolor: 'rgb(143,188,143)',
            }} variant="rounded">
              <MenuIcon />
            </Avatar>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemLink
                to='/home'
                label='Home'
                icon='home'
                onClick={lessThanSm? toggleDrawerOpen : undefined}
              />
            </List>
          </Box>

        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={lessThanSm ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};