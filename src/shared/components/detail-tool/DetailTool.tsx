import { Box, Button, Icon, Paper, useTheme } from '@mui/material';



export const DetailTool: React.FC = () => {
  const theme = useTheme();

  return (
    <Box 
      gap={1}
      marginX={1} 
      padding={1} 
      paddingX={2} 
      display="flex" 
      alignItems="center" 
      height={theme.spacing(5)} 
      component={Paper}
    >
      <Button
        align-items="center"
        color='primary'
        disableElevation
        variant='contained'
        endIcon={<Icon>add</Icon>}
      >Novo</Button>
    </Box>
  );
};