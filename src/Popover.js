import React from "react";
import { Manager, Target, Popper, Arrow } from "react-popper";
import randomID from "random-id";
import PopoverComponent from "./PopoverComponent";

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.closePopover = this.closePopover.bind(this);

    this.state = { isOpen: props.isOpen, id: randomID(10, "a") };
  }
  closePopover() {
    this.setState({ isOpen: false });
  }

  render() {
    const {
      className,
      onClose,
      onOpen,
      customArrow,
      isOpen,
      arrow,
      onClick,
      placement,
      render,
      target,
      action
    } = this.props;

    if (action === "click") {
      target.props.onClick = e => {
        var close = e.target.closest(".popover-content");
        if (close) {
          var getpopover = close.querySelector(".popover-content");
          if (!getpopover) {
            this.setState({ isOpen: !this.state.isOpen });
          }
        } else {
          this.setState({ isOpen: !this.state.isOpen });
        }
      };
    } else if (action === "hover") {
      target.props.onMouseEnter = e => {
        this.setState({ isOpen: true });
      };
      target.props.onMouseLeave = e => {
        const getElement = e.relatedTarget;
        if (getElement && getElement.nodeName) {
          const close = getElement.closest(".manager");
          if (close) {
            const hasDataId = close.hasAttribute("data-target-id");
            if (hasDataId) {
              const getDataId = close.getAttribute("data-target-id");
              if (getDataId) {
                if (getDataId != this.state.id) this.closePopover();
              }
            }
          }
        }
      };
    }

    return (
      
        <Manager className="manager" style={{'display':"inline"}} data-target-id={this.state.id}>
          <Target>
            {({ targetProps }) => (
              <div className="target-container" {...targetProps}>
                {target}
              </div>
            )}
          </Target>
          {this.state.isOpen ? (
            <PopoverComponent
              key={Math.random(1)}
              className={className}
              onClose={onClose}
              onOpen={onOpen}
              customArrow={customArrow}
              onClosePopover={this.closePopover}
              placement={placement}
              {...this.props}
              id={this.state.id}
            />
          ) : null}
        </Manager>
    );
  }
}

Popover.defaultProps = {
  arrow: true,
  placement: "auto",
  action: "click"
};

export default Popover;
