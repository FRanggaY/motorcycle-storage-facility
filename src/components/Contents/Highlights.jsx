import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    id: 1,
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Pengalaman pengguna yang luar biasa',
    description:
      'Integrasikan produk kami ke dalam rutinitas Anda dengan antarmuka yang intuitif dan mudah digunakan.',
  },
  {
    id: 2,
    icon: <SupportAgentRoundedIcon />,
    title: 'Informasi Tarif',
    description:
      'Pemilik jasa dapat dengan cepat dan mudah mendapatkan informasi tarif sesuai dengan waktu durasi penitipan kendaraan, memberikan fleksibilitas kepada pengguna sesuai dengan kebutuhan mereka.',
  },
  {
    id: 3,
    icon: <ConstructionRoundedIcon />,
    title: 'Keamanan',
    description:
      'Pengguna merasakan tingkat keamanan untuk motor mereka melalui fitur status kendaraan, yang memberikan informasi jelas apakah kendaraan sudah diambil atau belum. Dengan adanya indikator ini, pengguna dapat dengan mudah memonitor keberadaan dan status penitipan motor mereka.',
  },
  {
    id: 4,
    icon: <QueryStatsRoundedIcon />,
    title: 'Analisa Data',
    description:
      'Memudahkan pemilik jasa untuk melihat data statistik yang memperlihatkan berapa jam setiap pengendara menitipkan motor yang di tempat penitipan tersebut, yang memungkinkan ada penjelasan pada benefit yang akan diperoleh pada pemilik jasa.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Jelajahi mengapa produk kami menonjol: desain yang ramah dan inovatif. Nikmati dukungan dan manajemen yang terorganisir. 
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
