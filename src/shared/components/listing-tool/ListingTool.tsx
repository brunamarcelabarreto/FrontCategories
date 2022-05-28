/* eslint-disable react/prop-types */
import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';



interface ListingToolProps {
  textSearch?: string;
  showInputSearch?: boolean;
  switchTextSearch?:(newText: string) => void; 
  newButtonText?: string;
  showNewButton?: boolean;
  onClickInNewButton?: any;
}

export const ListingTool: React.FC<ListingToolProps> = ({ 
  textSearch ='',
  showInputSearch = false,
  switchTextSearch,
  newButtonText= 'Nova',
  showNewButton = 'Novo',
  onClickInNewButton = true,
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
      {showInputSearch && (
        <TextField 
          size="small" 
          value={textSearch}
          placeholder="Pesquisar..."
          onChange={(e) => switchTextSearch?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        
        {showNewButton &&(
          <Button
            justify-content="center"
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickInNewButton}
            endIcon={<Icon>add</Icon>}
          >{newButtonText}</Button>
        )}
      </Box>
    </Box>
  );
};