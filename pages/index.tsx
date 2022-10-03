import type { NextPage } from 'next';

import { Grid, Typography } from '@mui/material';

import OperationTypeCreateForm from '@/src/operation-type/components/create-form/operation-type.create-form';

const Home: NextPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4" align="center">
          Operation Type - Create Form
        </Typography>
        <OperationTypeCreateForm />
      </Grid>
    </Grid>
  );
};

export default Home;
