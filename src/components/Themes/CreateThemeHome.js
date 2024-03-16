
/* z-index: 1; */
import { createTheme, ThemeProvider } from '@mui/material';

const tHome = createTheme({
    palette: {
        pink1: {
            main: '#741b47ff', // Specify your primary color
        },
        pink2: {
            main: '#A6055D', // Specify your primary color
        },
        pink3: {
            main: '#D911A4', // Specify your secondary color
        },
        brown1: {
            main: '#8C4C3E', // Specify your secondary color
        },
        brown2: {
            main: '#D9863D', // Specify your secondary color
        },
        brown3: {
            main: '#F2B680', // Specify your secondary color
        },
        primary: {
            main: '#a6055d',
            light: '#833761',
            dark: '#740341',
        },
        white: {
            main: 'white'
        }

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    marginRight: '4%',
                    borderRadius: '5px !important',
                    border: 'none',
                    color: 'white',
                },
            },
        },MuiTypography:{
            styleOverrides: {
                root: {
                    fontSize: '60px',
                    color: 'white',
                    zIndex: 1,
                }
            },
        },
        MuiButtonGroup:{
            styleOverrides: {
                root: {
                    display: 'flex',
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }
            }
        }
    },
});
export default tHome;


