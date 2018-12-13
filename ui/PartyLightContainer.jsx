import React from 'react';

import { Button, ButtonGroup } from 'reactstrap';

// Fix React ES6 class issues
import reactAutoBind from 'react-autobind';

import SocketConnection, { eventHandler } from './SocketConnection.js';

import Board from './Board.jsx';

class PartyLightContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    reactAutoBind(this);
  }

  componentDidMount() {
    // SocketConnection.on('update', ({ status: { running } }) => this.setState({ running }));
  }

  render() {
    return (
      <>
        <Board />
      </>
    );
  }
}

export default PartyLightContainer;
