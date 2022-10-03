import { FormEvent } from 'react';
import { toast } from 'react-toastify';

import { Box, Button, Grid, Paper, TextField } from '@mui/material';

import { firebaseAuth } from '@/config/firebase';
import OperationTypeRepository from '@/src/operation-type/operation-type.repository';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

const OperationTypeCreateForm: OperationTypeTypes.CreateFormComponent = () => {
  const handleSubmit = (
    event: FormEvent<OperationTypeTypes.CreateForm>
  ): void => {
    event.preventDefault();

    const {
      nameInput: { value: name },
      colorInput: { value: color },
    } = event.currentTarget;

    const owner = firebaseAuth.currentUser?.uid;

    if (!name || !color || !owner) {
      toast.error('Preencha todos os campos!');

      return;
    }

    const operationTypeRepository = new OperationTypeRepository();

    operationTypeRepository
      .create({ name, color, owner })
      .then(
        (ok) => ok && toast.success('Tipo de operação criada com sucesso!')
      );
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
