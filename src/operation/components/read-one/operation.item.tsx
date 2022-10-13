import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { Delete, Edit, EditOff } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/system';

import useOperationStore from '@/src/operation/operation.store';
import OperationTypes from '@/src/operation/operation.types';

const OperationItem: OperationTypes.ItemComponent = ({
  id,
  date,
  description,
  value,
  operationTypeId,
  operationType: { name: operationType, color },
}) => {
  const { deleteItem, updateItem } = useOperationStore();
  const [edit, setEdit] = useState<boolean>(false);

  const [dateInput, setDateInput] = useState(date);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [valueInput, setValueInput] = useState(value);
  const [operationTypeIdInput, setOperationTypeIdInput] =
    useState(operationTypeId);

  const toggleEdit = (): void => setEdit((prev) => !prev);

  const handleSubmit = async (
    event: FormEvent<OperationTypes.CreateForm>
  ): Promise<void> => {
    event.preventDefault();

    if (
      !dateInput ||
      !descriptionInput ||
      !valueInput ||
      !operationTypeIdInput
    ) {
      toast.error('Preencha todos os campos!');
    } else {
      await updateItem(
        id,
        dateInput,
        descriptionInput,
        valueInput,
        operationTypeIdInput
      );
    }
  };

  const day = new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = new Date(date).toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const dateText = `${day} às ${time}`;
  const moneyText = `R$ ${value}`;

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: color ? alpha(color, 0.04) : undefined,
        borderColor: color ? alpha(color, 0.4) : undefined,
        height: '100%',
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="baseline"
        component={CardContent}
      >
        <Grid item xs="auto">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dateText}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton aria-label="update operation type" onClick={toggleEdit}>
            {edit ? <EditOff fontSize="small" /> : <Edit fontSize="small" />}
          </IconButton>
          <IconButton
            aria-label="delete operation type"
            onClick={deleteItem.bind(null, id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Collapse in={!edit}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="body1">{description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  {moneyText}
                  <br />
                  <Typography variant="overline" color="text.secondary">
                    {operationType}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Collapse>
          <Collapse in={edit}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              component="form"
              onSubmit={handleSubmit}
            >
              <Grid item xs={12}>
                <TextField
                  value={dateInput}
                  onChange={({ currentTarget }): void =>
                    setDateInput(currentTarget.value)
                  }
                />
                <TextField
                  value={descriptionInput}
                  onChange={({ currentTarget }): void =>
                    setDescriptionInput(currentTarget.value)
                  }
                />
                <TextField
                  value={valueInput}
                  onChange={({ currentTarget }): void =>
                    setValueInput(Number(currentTarget.value))
                  }
                />
                <TextField
                  value={operationTypeIdInput}
                  onChange={({ currentTarget }): void =>
                    setOperationTypeIdInput(currentTarget.value)
                  }
                />
              </Grid>
              <Grid item xs={12} ml="auto">
                <Button variant="outlined" type="submit" fullWidth>
                  Atualizar
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OperationItem;
