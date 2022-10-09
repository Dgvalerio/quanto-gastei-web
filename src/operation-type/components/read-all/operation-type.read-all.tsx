import { FC, useEffect } from 'react';

import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';

import OperationTypeItem from '@/src/operation-type/components/read-one/operation-type.item';
import useOperationTypeStore from '@/src/operation-type/operation-type.store';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

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

const OperationTypeReadAll: OperationTypeTypes.ReadAllComponent = () => {
  const { operationTypes, loadAll, loading } = useOperationTypeStore();

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  if (loading) return <LoadingSkeleton />;

  return (
    <Box component={Paper} p={2}>
      <Grid container spacing={2}>
        {operationTypes.length === 0 ? (
          <Grid item xs={12}>
            <Typography>Não há items para serem exibidos.</Typography>
          </Grid>
        ) : (
          operationTypes.map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type.id}>
              <OperationTypeItem {...type} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default OperationTypeReadAll;
