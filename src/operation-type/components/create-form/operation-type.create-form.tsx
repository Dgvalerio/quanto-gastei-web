import { FormEvent } from 'react';
import { toast } from 'react-toastify';

import { Box, Button, Grid, Paper, TextField } from '@mui/material';

import useOperationTypeStore from '@/src/operation-type/operation-type.store';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

const OperationTypeCreateForm: OperationTypeTypes.CreateFormComponent = () => {
  const { createItem } = useOperationTypeStore();

  const handleSubmit = async (
    event: FormEvent<OperationTypeTypes.CreateForm>
  ): Promise<void> => {
    event.preventDefault();

    const { nameInput, colorInput } = event.currentTarget;

    if (!nameInput.value || !colorInput.value) {
      toast.error('Preencha todos os campos!');
    } else {
      await createItem(nameInput.value, colorInput.value);
      nameInput.value = '';
      colorInput.value = '#000000';
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
        <Grid item xs={10}>
          <TextField
            name="nameInput"
            label="Nome"
            placeholder="Nome"
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            name="colorInput"
            label="Cor"
            placeholder="Cor"
            type="color"
            variant="outlined"
            defaultValue="#000000"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
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

export default OperationTypeCreateForm;
