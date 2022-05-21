import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface MenuLateralProps {
  children: React.ReactNode
}



// eslint-disable-next-line react/prop-types
export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <Box width={theme.spacing(28)} display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{ 
              height: theme.spacing(8), 
              width: theme.spacing(8),
              color: '#000000', 
              bgcolor: 'rgb(143,188,143)',
            }} variant= "rounded">
              <MenuIcon/>
            </Avatar>
          </Box>

          <Divider/>

          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>signpost</Icon>
                </ListItemIcon>
                <ListItemText primary="CATEGORIAS" />
              </ListItemButton> 
            </List>
          </Box>
   
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};