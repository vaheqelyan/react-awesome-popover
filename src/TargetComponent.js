import React from "react";
import ReactDOM from "react-dom";

import { Target } from "react-popper";

import isOverlay from "./isOverlay";

export default class TargetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zIndex: 1000 };
    this.click = this.click.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseLeave(e) {
    // this.props.closePopover();
    console.log(e.relatedTarget, "asd");
    var el = e.relatedTarget;
    if (el.nodeName == "DIV") {
      if (el.id == "overlay") {
        this.props.closePopover();
      }
    }
  }

  onMouseEnter() {
    this.props.openPopover();
    const target = ReactDOM.findDOMNode(this);

    target.parentNode.children[1].addEventListener(
      "mouseleave",
      e => {
        console.log(isOverlay(e.relatedTarget));
      },
      false
    );
  }
  componentDidMount() {
    const { action } = this.props;
    const target = ReactDOM.findDOMNode(this);
    this.target = target;
    if (action === "click") {
      target.addEventListener("click", this.click, false);
    } else if (action === "hover") {
      target.addEventListener("mouseenter", this.onMouseEnter, false);
      target.addEventListener("mouseleave", this.onMouseLeave, false);
    }
  }
  componentWillUnmount() {
    const { action, closePopover } = this.props;
    if (action === "click") {
      this.target.removeEventListener("click", this.click, false);
    } else if (action === "hover") {
      this.target.removeEventListener("mouseenter", this.onMouseEnter, false);
      this.target.removeEventListener("mouseleave", this.onMouseLeave, false);
    }
  }
  click(e) {
    e.stopImmediatePropagation();
    if (!e.target.nextSibling) this.props.tooglePopover();
  }
  render() {
    return (
      <Target>
        {({ targetProps }) => (
          <div
            className="target-container"
            style={{ zIndex: this.props.zIndex + 10 }}
            {...targetProps}
          >
            {this.props.children}
          </div>
        )}
      </Target>
    );
  }
}
