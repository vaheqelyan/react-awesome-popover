import React from "react";
import { Manager, Target, Popper, Arrow } from "react-popper";
import randomID from "random-id";
import PopoverComponent from "./PopoverComponent";
import TargetComponent from "./TargetComponent";
import closestWebshim from "./closest";

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.closePopover = this.closePopover.bind(this);
    this.tooglePopover = this.tooglePopover.bind(this);
    this.openPopover = this.openPopover.bind(this);
    this.state = {
      isOpen: props.defaultIsOpen,
      id: randomID(10, "a"),
      zIndex: 0
    };
  }
  componentDidMount() {
    if (!window.reactawesomepopover) {
      this.setState({ zIndex: 1000 });
      window.reactawesomepopover = 1000;
    } else {
      window.reactawesomepopover += 10;
      this.setState({ zIndex: window.reactawesomepopover });
    }
  }

  componentWillMount() {
    closestWebshim();
  }
  openPopover() {
    this.setState({ isOpen: true });
  }
  tooglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  closePopover() {
    this.setState({ isOpen: false });
  }
  componentWillReceiveProps({ open }) {
    this.setState({ isOpen: open });
  }
  render() {
    const {
      className,
      onClose,
      onOpen,
      customArrow,
      arrow,
      onClick,
      placement,
      modifiers,
      render,
      action,
      motion,
      children
    } = this.props;

    return (
      <Manager
        className="manager"
        style={{ display: "inline" }}
        data-target-id={this.state.id}
      >
        <TargetComponent
          id={this.state.id}
          closePopover={this.closePopover}
          openPopover={this.openPopover}
          tooglePopover={this.tooglePopover}
          action={action}
        >
          {children[0]}
        </TargetComponent>
        {this.state.isOpen ? (
          <PopoverComponent
            zIndex={this.state.zIndex}
            key={Math.random(1)}
            motion={motion}
            className={className}
            onClose={onClose}
            onOpen={onOpen}
            customArrow={customArrow}
            onClosePopover={this.closePopover}
            placement={placement}
            modifiers={modifiers}
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
  action: "click",
  modifiers: {},
  motion: false,
  className: undefined,
  defaultIsOpen: false,
  open: false
};

export default Popover;
