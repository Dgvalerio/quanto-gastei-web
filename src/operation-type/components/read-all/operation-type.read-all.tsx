import { useEffect, useState } from 'react';

import { Box, Grid, Paper } from '@mui/material';

import OperationTypeItem from '@/src/operation-type/components/read-one/operation-type.item';
import OperationTypeRepository from '@/src/operation-type/operation-type.repository';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

const OperationTypeReadAll: OperationTypeTypes.ReadAllComponent = () => {
  const [operationTypes, setOperationTypes] = useState<
    OperationTypeTypes.Model[]
  >([]);

  useEffect(() => {
    const operationTypeRepository = new OperationTypeRepository();

    operationTypeRepository
      .readAll()
      .then((result) => setOperationTypes(result));
  }, []);

  return (
    <Box component={Paper} p={2}>
      <Grid container spacing={2} justifyContent="center">
        {operationTypes.map((type) => (
          <Grid item xs={4} key={type.id}>
            <OperationTypeItem {...type} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OperationTypeReadAll;
