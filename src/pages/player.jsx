import React from 'react';
import $ from 'jquery';
import jPlayer from 'jplayer';
import Progress from '../components/progress';

let duration = null;
export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: '-' };
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
    // 获取音频文件的总播放时长
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
      });
    });
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  }

  render() {
    return (
      <div>
        <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor="#ff0000" />
      </div>
    );
  }
}
