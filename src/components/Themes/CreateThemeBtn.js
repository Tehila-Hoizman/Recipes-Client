import { createTheme, ThemeProvider } from '@mui/material';

const tBtn = createTheme({
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
            main: '#4c0200',
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
                },
            },
        },
    },
});
export default tBtn;


