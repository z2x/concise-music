import React from 'react';
import '../css/header.scss';
import logo from '../img/logo.png';

export default class Header extends React.Component {
  render() {
    return (
      <div className="components-header">
        <div className="logo row">
          <img src={logo} alt="logo" className="-col-auto" />
        </div>
        <h1 className="caption">Concise Music Player</h1>
      </div>
    );
  }
}
