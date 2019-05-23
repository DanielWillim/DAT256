import React, { createRef } from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function PickName({
  classes: { lowered },
  onName,
}) {
  const name = createRef();

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          Skriv in ditt namn för registrering till topplista
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <TextField
          inputRef={name}
          label="Vad är ditt namn?"
          defaultValue="Gäst"
          margin="normal"
        />
      </CardContent>
      <Divider />
      <CardActionArea onClick={() => onName(name.current.value)}>
        <CardContent>
          <Typography variant="body1">
            Registrera namn
          </Typography>
        </CardContent>
      </CardActionArea>
    </React.Fragment>
  );
}
