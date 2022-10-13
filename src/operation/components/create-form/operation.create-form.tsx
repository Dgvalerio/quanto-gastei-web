import { FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';

import useOperationTypeStore from '@/src/operation-type/operation-type.store';
import useOperationStore from '@/src/operation/operation.store';
import OperationTypes from '@/src/operation/operation.types';

const OperationCreateForm: OperationTypes.CreateFormComponent = () => {
  const { createItem } = useOperationStore();
  const { loadAll, operationTypes } = useOperationTypeStore();

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const handleSubmit = async (
    event: FormEvent<OperationTypes.CreateForm>
  ): Promise<void> => {
    event.preventDefault();

    const { dateInput, descriptionInput, valueInput, operationTypeIdInput } =
      event.currentTarget;

    if (
      !dateInput.value ||
      !descriptionInput.value ||
      !valueInput.valueAsNumber ||
      !operationTypeIdInput.value
    ) {
      toast.error('Preencha todos os campos!');
    } else {
      await createItem(
        dateInput.value,
        descriptionInput.value,
        valueInput.valueAsNumber,
        operationTypeIdInput.value
      );

      dateInput.value = '';
      descriptionInput.value = '';
      valueInput.value = '';
      operationTypeIdInput.value = '';
    }
  };

  return (
    <Box component={Paper} p={2}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={6}>
          <TextField
            name="dateInput"
            label="Data"
            placeholder="Data"
            type="datetime-local"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="operationTypeIdInput"
            label="Operação"
            placeholder="Operação"
            select
            variant="outlined"
            required
            fullWidth
          >
            {operationTypes.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="descriptionInput"
            label="Descrição"
            placeholder="Descrição"
            multiline
            maxRows={4}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="valueInput"
            label="Valor"
            placeholder="Valor"
            type="number"
            inputProps={{ inputMode: 'numeric', min: 0, step: 0.01 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={2} ml="auto">
          <Button variant="outlined" type="submit" fullWidth>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperationCreateForm;
