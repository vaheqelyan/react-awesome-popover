import React from "react";
import { Popper } from "react-popper";
import ArrowComponent from "./ArrowComponent";

export default class PopoverComponent extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.closePopoverOnMouseLeave = this.closePopoverOnMouseLeave.bind(this);
  }
  onClick(e) {
    console.log(e.target);
    this.props.onClosePopover();
  }

  closePopoverOnMouseLeave(e) {
    e.preventDefault();
    this.props.onClosePopover();
  }
  click(e) {
    const thispopover = this.refs.popover._node;
    const close = e.target.closest(".popover-content");
    if (!close) {
      this.props.onClosePopover();
    } else {
      const child_popover = thispopover.querySelector(".popover-content");
      if (!child_popover) {
        if (
          close.getAttribute("data-id") != thispopover.getAttribute("data-id")
        ) {
          this.props.onClosePopover();
        }
      }
    }
  }

  componentWillUnmount() {
    const { action, onClose } = this.props;
    if (action === "click") {
      document.removeEventListener("click", this.click, false);
    } else if (action === "hover") {
      document.removeEventListener("mouseover", this.onMouseOver, false);
      this.refs.popover._node.removeEventListener(
        "mouseleave",
        this.closePopoverOnMouseLeave,
        false
      );
    }

    if (onClose) onClose();
  }

  onMouseOver(e) {
    const popover = this.refs.popover._node;
    const child = popover.querySelector(".popover-content");
    if (!child) {
      popover.addEventListener(
        "mouseleave",
        this.closePopoverOnMouseLeave,
        false
      );
    }
    if (!e.target.closest(".manager")) {
      this.props.onClosePopover();
    }
  }

  componentDidMount() {
    // const { action, onOpen } = this.props;
    // if (action === "click") {
    //   document.addEventListener("click", this.click, false);
    // } else if (action === "hover") {
    //   document.addEventListener("mouseover", this.onMouseOver, false);
    // }
    // if (onOpen) onOpen();
  }

  render() {
    const {
      placement,
      modifiers,
      arrow,
      className,
      motion,
      id,
      customArrow,
      children
    } = this.props;

    return (
      <React.Fragment>
        <Popper placement={placement} modifiers={modifiers} ref="popover">
          {({ popperProps, restProps }) => {
            if (/bottom/gi.test(popperProps["data-placement"])) {
              popperProps.style.top += 8.4;
            } else if (/top/gi.test(popperProps["data-placement"])) {
              popperProps.style.top -= 8.4;
            } else if (/left/gi.test(popperProps["data-placement"])) {
              popperProps.style.left -= 8.4;
            } else if (/right/gi.test(popperProps["data-placement"])) {
              popperProps.style.left += 8.4;
            }
            popperProps.className = "popover-content";
            popperProps.style.zIndex = this.props.zIndex + 10;
            return (
              <div className="popper" {...popperProps}>
                {children[1]}
                {arrow ? (
                  <ArrowComponent
                    customArrow={customArrow}
                    dataPlacement={popperProps["data-placement"]}
                  />
                ) : null}
              </div>
            );
          }}
        </Popper>

        <div
          onClick={this.onClick.bind(this)}
          id="overlay"
          style={{ zIndex: this.props.zIndex }}
        />
      </React.Fragment>
    );
  }
}
