import React from 'react';
import '../css/header.scss';
import logo from '../img/logo.png';

export default class Header extends React.Component {
  render() {
    return (
      <div className="components-header">
        <img src={logo} alt="logo" />
        <h1 className="caption">Concise Music Player</h1>
      </div>
    );
  }
}
