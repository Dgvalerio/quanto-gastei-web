import { Delete } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
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
  const { deleteItem } = useOperationTypeStore();

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
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OperationTypeItem;
