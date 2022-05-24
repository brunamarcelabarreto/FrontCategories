import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';


interface ToolbarProps {
  textSearch?: string;
  showInputSearch?: boolean;
  switchTextSearch?:(newText: string) => void; 
}

export const HomeToolbar: React.FC<ToolbarProps> = ({ 
  textSearch ='',
  showInputSearch= false,
  switchTextSearch,
}) => {
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
      <TextField 
        size="small" 
        value={textSearch}
        placeholder="Pesquisar..."
        onChange={(e) => switchTextSearch?.(e.target.value)}
      />
      <Box flex={1} display="flex" justifyContent="end">
        <Button
          color='primary'
          disableElevation
          variant='contained'
          endIcon={<Icon>add</Icon>}
        >Novo</Button>
      </Box>
    </Box>
  );
};