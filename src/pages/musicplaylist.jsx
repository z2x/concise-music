import React from 'react';
import MusicListItem from '../components/musiclistitem.jsx';

export default class MusicPlayList extends React.Component {
  render() {
    let listElement = null;
    listElement = this.props.musicList.map((item) => {
      return (
          <MusicListItem key={item.id} data={item} focus={item === this.props.currentMusicItem} />
        )
    })

    return (
      <ul>
        {listElement}
      </ul>
    );
  }
}
