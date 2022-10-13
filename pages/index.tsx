import type { NextPage } from 'next';

import { Grid, Typography } from '@mui/material';

import OperationCreateForm from '@/src/operation/components/create-form/operation.create-form';
import OperationReadAll from '@/src/operation/components/read-all/operation.read-all';

const Home: NextPage = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10}>
        <Typography variant="h4" align="center">
          Operation - Create Form
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <OperationCreateForm />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" align="center">
          Operation - Read All
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <OperationReadAll />
      </Grid>
    </Grid>
  );
};

export default Home;
