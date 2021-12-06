import { colors } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import shadows from './shadows';
import typography from './typography';

const Blue = "#263238";
const Orange = "#FFBA60";
const lightBlue = `#1976D2`;
const Grey = "#616161";
const Yellow = "#ffc72d";
const Red = "#FF0000";

export default createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white,
    },
    common: {
      blue: `${Blue}`,
      Orange: `${Orange}`,
      Gray: `${Grey}`,
      yellow: `${Yellow}`,
      red: `${Red}`,
    },
    primary: {
      contrastText: '#ffffff',
      main: '#263238'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});
