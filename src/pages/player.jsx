import React from 'react';
import $ from 'jquery';
import jPlayer from 'jplayer';
import Progress from '../components/progress';
import '../css/player.scss';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';

let duration = null;
export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ' ',
    };

    this.changePlayStateHandle = this.changePlayStateHandle.bind(this);
  }

  // 时间格式化
  formatTime(time) {
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
    // 获取音频文件的总播放时长
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)),
      });
    });
  }

  playPrev() {
    Pubsub.publish('Play_Prev');
  }

  playNext() {
    Pubsub.publish('Play_Next');
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  }

  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume', progress);
  }

  changePlayStateHandle() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause');
    } else {
      $('#player').jPlayer('play');
    }

    this.setState({
      isPlay: !this.state.isPlay,
    });
  }

  render() {
    return (
      <div className="player-page">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">
                  <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler} barColor='#aaa' />
                </div>
              </div>
            </div>
            <div style={{ height: 10, lineHeight: '10px' }}>
              <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} />
            </div>
            <div className="mt35 row">
              <div>
                <i onClick={this.playPrev} className="icon prev"> </i>
                <i className={`icon ml20  ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.changePlayStateHandle}></i>
                <i onClick={this.playNext} className="icon next ml20"></i>
              </div>
              <div className="-col-auto">
                <i className="repeat-cycle icon"></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
          </div>
        </div>
      </div>
    );
  }
}
