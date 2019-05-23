import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function LogOutpage({
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
        <button
          type="button"
          onClick={() => console.log('test')}
        >
          Logga ut
        </button>
        <br />
        <br />
      </Card>
    </center>

  );
}
export default withStyles(styles)(LogOutpage);
