import { createTheme } from '@mui/material';
export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(143,188,143)',
      dark: 'rgb(128,169,128)',
      light: 'rgb(165,201,165)',
      contrastText: '#000000',
    },
    secondary: {
      main: 'rgb(249,229,229)',
      dark: 'rgb(246,214,214)',
      light: 'rgb(250,234,234)',
      contrastText: '#000000',
    },
    background: {
      default: '#202124' ,
      paper: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});
