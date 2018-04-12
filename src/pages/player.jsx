import React from 'react';
import $ from 'jquery';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: '-' };
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
      });
    });
  }
}
