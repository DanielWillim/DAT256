import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function LogOutpage({
  classes: { card, lowered },
}) {
  return (
    <center>
      <Card className={card}>
        <CardContent>
          <Typography variant="h6" className={lowered}>
            Vill du logga ut?
          </Typography>
        </CardContent>
        <Divider />
        <br />
        <Button
          variant="contained"
          align="center"
          type="button"
          // TODO: Sign out action
          onClick={() => 'TODO'}
        >
          Logga ut
        </Button>
        <br />
        <br />
      </Card>
    </center>
  );
}
