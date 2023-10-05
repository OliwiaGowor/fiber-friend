import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                backgroundColor: '##f5720e',
                color: '#fff',
              }),
          }),
        },
      },
      
    },
  });