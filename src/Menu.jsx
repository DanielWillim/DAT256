import React from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Casino from '@material-ui/icons/Casino';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Star from '@material-ui/icons/Star';

export default class Menu extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      App,
      Leaderboard,
      LogoutPage,
      classes,
    } = this.props;
    const { value } = this.state;

    const View = [App, Leaderboard, LogoutPage][value];

    return (
      <React.Fragment>
        <Tabs
          value={value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Casino />} label="SPEL" />
          <Tab icon={<Star />} label="TOPPLISTA" />
          <Tab icon={<ExitToApp />} label="LOGGA UT" />
        </Tabs>
        <View classes={classes} />
      </React.Fragment>
    );
  }
}
