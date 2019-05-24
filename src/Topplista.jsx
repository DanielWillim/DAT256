import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function Topplista({ classes: { lowered } }) {
  return (
    <center>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          Topplista
        </Typography>
      </CardContent>
      <Divider />
      <br />
      <br />
      <br />
    </center>
  );
}
