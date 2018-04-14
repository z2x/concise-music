import React from 'react';
import '../css/musiclistitem.scss';
import Pubsub from 'pubsub-js';

export default class MusicListItem extends React.Component {
  playMusic(musicItem) {
    Pubsub.publish('Play_Music', musicItem);
  }

  deleteMusic(musicItem, e) {
    e.stopPropagation();
    Pubsub.publish('Delete_Music', musicItem);
  }
  render() {
    let musicItem = this.props.data;
    return (
        <li className={`row components-listitem ${this.props.focus ? ' focus' : ''}`} onClick={this.playMusic.bind(this, musicItem)}>
          <p>
            <span className="bold">{musicItem.title} - {musicItem.artist}</span>
          </p>
          <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
        </li>
      )
  }
}
