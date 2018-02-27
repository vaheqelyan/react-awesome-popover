import React from "react";

export default class Overlay extends React.Component {
  componentDidMount() {
    const { touch, onClosePopover } = this.props;
    if (touch) {
      this.refs.node.addEventListener("touchstart", onClosePopover, false);
    } else {
      this.refs.node.addEventListener("click", onClosePopover, false);
    }
  }
  componentWillUnmount() {
    const { touch, onClosePopover } = this.props;
    if (touch) {
      this.refs.node.removeEventListener("touchstart", onClosePopover, false);
    } else {
      this.refs.node.removeEventListener("click", onClosePopover, false);
    }
  }

  render() {
    const { onClosePopover, zIndex } = this.props;
    return (
      <div
        ref="node"
        onClick={onClosePopover}
        id="rap-overlay"
        style={{
          zIndex: this.props.zIndex + 100
        }}
      />
    );
  }
}
