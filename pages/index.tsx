import type { NextPage } from 'next';

import { Grid, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h1" align="center">
          Quanto Gastei?
        </Typography>
        <Typography variant="h2" align="center">
          Home Page
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
