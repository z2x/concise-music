import $ from 'jquery';
import jPlayer from 'jplayer';
import React from 'react';
import Header from './components/header';
import Player from './pages/player';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: '-' };
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
  }
  render() {
    return (
      <div>
        <Header />
        <Player />
      </div>
    );
  }
}
