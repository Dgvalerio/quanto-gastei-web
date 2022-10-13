import { FC, useEffect } from 'react';

import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';

import OperationItem from '@/src/operation/components/read-one/operation.item';
import useOperationStore from '@/src/operation/operation.store';
import OperationTypes from '@/src/operation/operation.types';

const LoadingSkeleton: FC = () => (
  <Box component={Paper} p={2}>
    <Grid container spacing={2}>
      {[...new Array(6)].map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const OperationReadAll: OperationTypes.ReadAllComponent = () => {
  const { operations, loadAll, loading } = useOperationStore();

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  if (loading) return <LoadingSkeleton />;

  return (
    <Box component={Paper} p={2}>
      <Grid container spacing={2}>
        {operations.length === 0 ? (
          <Grid item xs={12}>
            <Typography>Não há items para serem exibidos.</Typography>
          </Grid>
        ) : (
          operations.map((type) => (
            <Grid item xs={12} key={type.id}>
              <OperationItem {...type} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default OperationReadAll;
