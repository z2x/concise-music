import React from 'react';
import '../css/musiclistitem.scss';

export default class MusicListItem extends React.Component {
  render() {
    let item = this.props.data;
    return (
        <li className={`row components-listitem ${this.props.focus ? ' focus' : ''}`}>
          <p>
            <span className="bold">{item.title} - {item.artist}</span>
          </p>
          <p className="-col-auto delete"></p>
        </li>
      )
  }
}
