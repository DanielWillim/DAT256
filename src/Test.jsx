// @flow
import React, { Component } from 'react';

type withMsg = {
  msg: string,
};

export default class Test extends Component<withMsg, withMsg> {
  constructor({ msg }: withMsg) {
    super();
    this.state = { msg };
  }

  render() {
    const { msg } = this.state;
    return (
      <p>
        Testing:
        {msg}
      </p>
    );
  }
}
