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
      currentMusicItem: musicItem,
    });
  }

  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
    });

    this.playMusic(this.state.currentMusicItem);

    Pubsub.subscribe('Play_Music', (message, musicItem) => {
      this.playMusic(musicItem);
    })

    Pubsub.subscribe('Delete_Music', (message, musicItem) => {
        this.setState({
          musicList: this.state.musicList.filter( item => {
            return item !== musicItem;
          })
        })
    })
  }

  componentWillUnmount() {
    Pubsub.unsubscribe('Play_Music');
    Pubsub.unsubscribe('Delete_Music');
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
