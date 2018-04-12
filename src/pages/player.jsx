import React from 'react';
import $ from 'jquery';
import jPlayer from 'jplayer';
import Progress from '../components/progress';
import '../css/player.scss';

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
      <div className="player-page">
        <h1 className="caption">我的私人音乐坊 &gt;</h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist">歌手</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-2:00</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">音量控制部分</div>
              </div>
            </div>
            <div style={{ height: 10, lineHeight: '10px' }}>
              <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor="#ff0000" />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev"> &lt; </i>
                <i className="icon ml20 play"></i>
                <i className="icon next ml20">&gt;</i>
              </div>
              <div className="-col-auto">
                <i className="repeat-cycle icon"></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img src="" alt="歌曲封面" />
          </div>
        </div>
      </div>
    );
  }
}
