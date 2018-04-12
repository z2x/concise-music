import React from 'react';
import '../css/progress.scss';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.changeProgress = this.changeProgress.bind(this);
  }

  // 当前的进度值计算公式：
  // e.clientX - node.getBoundClinetReact().left
  changeProgress(e) {
    e.preventDefault();
    // 获取DOM节点
    const progressBar = this.refs.progressBar;

    // 计算点击之后对应的进度值
    const progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;

    this.props.onProgressChange && this.props.onProgressChange(progress);
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
