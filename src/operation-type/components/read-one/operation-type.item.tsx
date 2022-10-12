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

import useOperationTypeStore from '@/src/operation-type/operation-type.store';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

const OperationTypeItem: OperationTypeTypes.ItemComponent = ({
  id,
  name,
  color,
}) => {
  const { deleteItem, updateItem } = useOperationTypeStore();
  const [edit, setEdit] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState(name);
  const [colorInput, setColorInput] = useState(color);

  const toggleEdit = (): void => setEdit((prev) => !prev);

  const handleSubmit = async (
    event: FormEvent<OperationTypeTypes.CreateForm>
  ): Promise<void> => {
    event.preventDefault();

    if (!nameInput || !colorInput) {
      toast.error('Preencha todos os campos!');
    } else {
      await updateItem(id, nameInput, colorInput);
      setNameInput('');
      setColorInput('#000000');
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        color,
        backgroundColor: color ? alpha(color, 0.1) : undefined,
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
            #{id}
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
            <Typography variant="h5" component="div">
              {name}
            </Typography>
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
                  value={nameInput}
                  onChange={({ currentTarget }): void =>
                    setNameInput(currentTarget.value)
                  }
                  label="Nome"
                  placeholder="Nome"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={colorInput}
                  onChange={({ currentTarget }): void =>
                    setColorInput(currentTarget.value)
                  }
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

export default OperationTypeItem;
