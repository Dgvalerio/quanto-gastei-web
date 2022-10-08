import { FC, useEffect } from 'react';

import { Box, Grid, Paper, Skeleton } from '@mui/material';

import OperationTypeItem from '@/src/operation-type/components/read-one/operation-type.item';
import useOperationTypeStore from '@/src/operation-type/operation-type.store';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

const LoadingSkeleton: FC = () => (
  <>
    {[...new Array(6)].map((_, i) => (
      <Grid key={i} item xs={12} sm={6} md={4}>
        <Skeleton width="100%" height={128} sx={{ transform: 'none' }} />
      </Grid>
    ))}
  </>
);

const OperationTypeReadAll: OperationTypeTypes.ReadAllComponent = () => {
  const { operationTypes, loadAll, loading } = useOperationTypeStore();

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  return (
    <Box component={Paper} p={2}>
      <Grid container spacing={2}>
        {loading ? (
          <LoadingSkeleton />
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
