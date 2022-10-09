import type { NextPage } from 'next';

import { Grid, Typography } from '@mui/material';

import OperationTypeCreateForm from '@/src/operation-type/components/create-form/operation-type.create-form';
import OperationTypeReadAll from '@/src/operation-type/components/read-all/operation-type.read-all';

const Home: NextPage = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10}>
        <Typography variant="h4" align="center">
          Operation Type - Create Form
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <OperationTypeCreateForm />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" align="center">
          Operation Type - Read All
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <OperationTypeReadAll />
      </Grid>
    </Grid>
  );
};

export default Home;
