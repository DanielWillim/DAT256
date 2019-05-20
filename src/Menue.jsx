import React from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Casino from '@material-ui/icons/Casino';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Star from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
};

class IconLabelTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { App, classes } = this.props;
    console.log (this.state);
    const { value } = this.state;
    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Casino />} label="SPEL" />
          <Tab icon={<Star />} label="TOPPLISTA" />
          <Tab icon={<ExitToApp />} label="LOGGA UT" />
        </Tabs>
        {[
          <App />,
          <div>Implementera Topplista</div>,
          <div>Implementera Logga ut</div>,
        ][value]
        }

      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);
