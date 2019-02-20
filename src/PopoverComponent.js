import React from 'react';
import { Popper } from 'react-popper';
import ArrowComponent from './ArrowComponent';
import isOverlay from './isOverlay';
import Overlay from './Overlay';

export default class PopoverComponent extends React.Component {
  componentWillUnmount() {
    const { action, onClose } = this.props;
    if (action === 'hover') {
      this.refs.popover._node.removeEventListener('mouseleave', this.ms, false);
    }

    if (onClose) onClose();
  }

  ms = ({ relatedTarget }) => isOverlay(relatedTarget) && this.props.onClosePopover();

  componentDidMount() {
    const { action, onOpen } = this.props;
    if (action === 'hover') {
      this.refs.popover._node.addEventListener('mouseleave', this.ms, false);
    }

    if (onOpen) onOpen();
  }

  render() {
    const {
      placement,
      modifiers,
      arrow,
      contentClass,
      motion,
      customArrow,
      children,
      onClosePopover,
      touch,
      arrowClass,
      arrowFill
    } = this.props;

    return (
      <React.Fragment>
        <Popper placement={placement} modifiers={modifiers}>
          {({ popperProps }) => {
            let dataPlacement = popperProps['data-placement'];
            let g = dataPlacement && dataPlacement.split('-')[0];

            popperProps = {
              ...popperProps,
              ...{
                style: {
                  ...popperProps.style,
                  ...{ zIndex: this.props.zIndex + 101 },

                  [do {
                    if (g == 'top' || g == 'bottom') {
                      ('top');
                    } else if (g == 'right' || g == 'left') {
                      ('left');
                    }
                  }]: do {
                    if (g == 'bottom') {
                      8;
                    } else if (g == 'top') {
                      -8;
                    } else if (g == 'left') {
                      -8;
                    } else if (g == 'right') {
                      8;
                    }
                  }
                }
              }
            };

            if (motion) {
              const ArrowCallback = arrow ? (
                <ArrowComponent
                  arrowClass={arrowClass}
                  customArrow={customArrow}
                  dataPlacement={popperProps['data-placement']}
                  arrowFill={arrowFill}
                />
              ) : null;
              return children[1](
                {
                  ...popperProps,
                  ...{ className: contentClass }
                },
                ArrowCallback
              );
            } else {
              return (
                <div className={contentClass} {...popperProps}>
                  {children[1]}
                  {arrow ? (
                    <ArrowComponent
                      arrowClass={arrowClass}
                      customArrow={customArrow}
                      dataPlacement={popperProps['data-placement']}
                      arrowFill={arrowFill}
                    />
                  ) : null}
                </div>
              );
            }
          }}
        </Popper>
        <Overlay touch={touch} onClosePopover={onClosePopover} zIndex={this.props.zIndex} />
      </React.Fragment>
    );
  }
}
