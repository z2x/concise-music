import $ from 'jquery';
import jPlayer from 'jplayer';
import React from 'react';
import Header from './components/header';
import Player from './pages/player';
import { MusicList } from './data/playdata';
import MusicPlayList from './pages/musicplaylist';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Pubsub from 'pubsub-js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMusicItem: MusicList[0],
      musicList: MusicList,
    };
  }

  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file,
    }).jPlayer('play');
    this.setState({
      currentMusicItem: musicItem
    });
  }

  // 控制播放下一曲或者上一曲音乐
  playNext(type = 'next') {
    let index = this.state.musicList.indexOf(this.state.currentMusicItem)
    let newIndex = null
    if (type === 'next') {
      newIndex = (index + 1) % this.state.musicList.length
    } else {
      newIndex = (index + this.state.musicList.length - 1) % this.state.musicList.length
    }
    console.log(newIndex);
    this.playMusic(this.state.musicList[newIndex])

    this.setState({
      currentMusicItem: this.state.musicList[newIndex]
    })
  }

  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
    });

    this.playMusic(this.state.currentMusicItem);

    // 订阅当前音乐播放结束自动播放下一曲
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    });

    Pubsub.subscribe('Play_Music', (message, musicItem) => {
      this.playMusic(musicItem);
    });

    Pubsub.subscribe('Delete_Music', (message, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter( item => {
          return item !== musicItem;
        })
      });
    });

    // 订阅播放下一曲音乐或者上一曲音乐
    Pubsub.subscribe('Play_Prev', (message, musicItem) => {
      this.playNext('prev');
    })

    Pubsub.subscribe('Play_Next', (message, musicItem) => {
      this.playNext();
    })
  }

  componentWillUnmount() {
    Pubsub.unsubscribe('Play_Music');
    Pubsub.unsubscribe('Delete_Music');
    Pubsub.unsubscribe('Play_Prev');
    Pubsub.unsubscribe('Play_Next');
    $('#player').unbind($.jPlayer.event.ended);
  }
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/' render = {() => <Player currentMusicItem={this.state.currentMusicItem} />} />
            <Route path="/list" render = {() => <MusicPlayList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
