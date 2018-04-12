import $ from 'jquery';
import jPlayer from 'jplayer';
import React from 'react';
import Header from './components/header';
import Progress from './components/progress';

let duration = null;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: '-' };
    this.progressChangeHandler = this.progressChangeHandler.bind(this);
  }

  componentDidMount() {
    $('#player').jPlayer({
      ready() {
        $(this).jPlayer('setMedia', {
          mp3: 'http://hao.haolingsheng.com/ring/000/987/83ce1ce486cabaeca68f4f5bbe5c7e3b.mp3',
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window',
    });
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
        <Header />
        <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} />
      </div>
    );
  }
}
