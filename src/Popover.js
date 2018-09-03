import React from 'react';
import { Manager } from 'react-popper';
import randomID from 'random-id';
import PopoverComponent from './PopoverComponent';
import TargetComponent from './TargetComponent';
import closestWebshim from './closest';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.defaultIsOpen,
      id: null,
      zIndex: 0
    };
  }
  componentDidMount() {
    closestWebshim();
    this.setState({ zIndex: 100, id: randomID(10, 'a') });
  }

  openPopover = () => {
    this.setState({ isOpen: true });
  };
  tooglePopover = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  closePopover = () => {
    this.setState({ isOpen: false });
  };
  componentWillReceiveProps({ open }) {
    this.setState({ isOpen: open });
  }
  render() {
    const {
      contentClass,
      arrowClass,
      onClose,
      onOpen,
      customArrow,
      placement,
      modifiers,
      action,
      motion,
      children,
      targetClass,
      touch
    } = this.props;

    return (
      <Manager className="rap-manager">
        <TargetComponent
          targetClass={targetClass}
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
            contentClass={contentClass}
            onClose={onClose}
            onOpen={onOpen}
            customArrow={customArrow}
            onClosePopover={this.closePopover}
            placement={placement}
            modifiers={modifiers}
            touch={touch}
            arrowClass={arrowClass}
            {...this.props}
          />
        </If>
      </Manager>
    );
  }
}

Popover.defaultProps = {
  arrow: true,
  placement: 'auto',
  action: 'click',
  modifiers: {},
  motion: false,
  targetClass: '',
  contentClass: null,
  defaultIsOpen: false,
  open: false,
  arrowClass: null,
  touch: false
};

export default Popover;
