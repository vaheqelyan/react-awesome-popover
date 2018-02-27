import React from "react";

import { Target } from "react-popper";

export default class TargetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseLeave({ relatedTarget: el }) {
    if (el.nodeName == "DIV") {
      if (el.id == "rap-overlay") {
        this.props.closePopover();
        return;
      }
    }
    var target = el.closest(".rap-target-container");
    if (target) {
      if (target.hasAttribute("data-target-id")) {
        var attr = target.getAttribute("data-target-id");
        if (attr != this.props.id) {
          this.props.closePopover();
        }
      }
    }
  }

  onMouseEnter = () => this.props.openPopover();
  componentDidMount() {
    const { action, touch } = this.props;
    if (action === "click") {
      if (touch) {
        this.target.addEventListener("touchstart", this.click, false);
      } else {
        this.target.addEventListener("click", this.click, false);
      }
    } else if (action === "hover") {
      this.target.addEventListener("mouseenter", this.onMouseEnter, false);
      this.target.addEventListener("mouseleave", this.onMouseLeave, false);
    }
  }
  componentWillUnmount() {
    const { action, closePopover, touch } = this.props;
    if (action === "click") {
      if (touch) {
        this.target.removeEventListener("touchstart", this.click, false);
      } else {
        this.target.removeEventListener("click", this.click, false);
      }
    } else if (action === "hover") {
      this.target.removeEventListener("mouseenter", this.onMouseEnter, false);
      this.target.removeEventListener("mouseleave", this.onMouseLeave, false);
    }
  }
  getNode = node => (this.target = node);
  click = e => {
    this.props.tooglePopover();
  };
  render() {
    const style = this.props.isOpen
      ? { zIndex: this.props.zIndex + 101 }
      : { zIndex: this.props.zIndex };
    return (
      <Target innerRef={this.getNode}>
        {({ targetProps }) => (
          <div
            data-target-id={this.props.id}
            className="rap-target-container"
            style={style}
            {...targetProps}
          >
            {this.props.children}
          </div>
        )}
      </Target>
    );
  }
}
