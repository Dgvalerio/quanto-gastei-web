import { Card, CardContent, Typography } from '@mui/material';
import { alpha } from '@mui/system';

import OperationTypeTypes from '@/src/operation-type/operation-type.types';

const OperationTypeItem: OperationTypeTypes.ItemComponent = ({
  id,
  name,
  color,
}) => {
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
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{id}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OperationTypeItem;
