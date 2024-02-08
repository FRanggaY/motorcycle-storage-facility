import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../utils/getLPTheme';
import NavAppBar from '../components/Common/NavAppBar';
import Hero from '../components/Contents/Hero';
import Highlights from '../components/Contents/Highlights';
import Footer from '../components/Common/Footer';

export default function LandingPage() {
  const mode = useSelector((state) => state.theme.mode);
  const LPtheme = createTheme(getLPTheme(mode));

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <NavAppBar/>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Highlights />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
