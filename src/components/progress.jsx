import React from 'react';
import '../css/progress.scss';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.changeProgress = this.changeProgress.bind(this);
  }

  changeProgress(e) {
    e.preventDefault();
    const progressBar = this.refs.progressBar;
    const progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    console.log(progress);
  }

  render() {
    return (
      <div className="components-progress" onClick={this.changeProgress} ref='progressBar'>
        <div className="progress" style={{width: `${this.props.progress}%`}}>

        </div>
      </div>
    );
  }
}
