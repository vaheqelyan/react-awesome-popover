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
      id: undefined,
      zIndex: 0
    };
  }
  componentDidMount() {
    closestWebshim();
    var zi;
    if (!window.reactawesomepopover) {
      zi = 100;
      window.reactawesomepopover = 100;
    } else {
      window.reactawesomepopover += 10;
      zi = window.reactawesomepopover;
    }
    this.setState({ zIndex: zi, id: randomID(10, "a") });
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
      children,
      touch
    } = this.props;

    return (
      <Manager className="rap-manager">
        <TargetComponent
          id={this.state.id}
          closePopover={this.closePopover}
          openPopover={this.openPopover}
          tooglePopover={this.tooglePopover}
          action={action}
          zIndex={this.state.zIndex}
          isOpen={this.state.isOpen}
          touch={touch}
        >
          {children[0]}
        </TargetComponent>
        <If condition={this.state.isOpen}>
          <PopoverComponent
            zIndex={this.state.zIndex}
            motion={motion}
            className={className}
            onClose={onClose}
            onOpen={onOpen}
            customArrow={customArrow}
            onClosePopover={this.closePopover}
            placement={placement}
            modifiers={modifiers}
            touch={touch}
            {...this.props}
          />
        </If>
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
  open: false,
  touch: false
};

export default Popover;
