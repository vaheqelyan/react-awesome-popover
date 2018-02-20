import React from "react";
import ReactDOM from "react-dom";

import { Target } from "react-popper";

export default class TargetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zIndex: 1000 };
    this.click = this.click.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseLeave(e) {
    const getElement = e.relatedTarget;
    if (getElement && getElement.nodeName) {
      const close = getElement.closest(".manager");
      if (close) {
        const hasDataId = close.hasAttribute("data-target-id");
        if (hasDataId) {
          const getDataId = close.getAttribute("data-target-id");
          if (getDataId) {
            if (getDataId != this.props.id) this.props.closePopover();
          }
        }
      }
    }
  }
  onMouseEnter() {
    this.props.openPopover();
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
          <div className="target-container" {...targetProps}>
            {this.props.children}
          </div>
        )}
      </Target>
    );
  }
}
