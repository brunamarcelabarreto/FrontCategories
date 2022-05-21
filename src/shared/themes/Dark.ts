import { createTheme } from '@mui/material';
export const DarkTheme = createTheme({
  palette: {
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
      default: '#cccccc' ,
      paper: '#d6d6d6',
    },
  }
});
