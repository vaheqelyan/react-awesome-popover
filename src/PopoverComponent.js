// menma
import React from "react";
import { Popper } from "react-popper";
import ArrowComponent from "./ArrowComponent";
import isOverlay from "./isOverlay";
import Overlay from "./Overlay";

export default class PopoverComponent extends React.Component {
  componentWillUnmount() {
    const { action, onClose } = this.props;
    if (action === "hover") {
      this.refs.popover._node.removeEventListener("mouseleave", this.ms, false);
    }

    if (onClose) onClose();
  }

  ms = ({ relatedTarget }) =>
    isOverlay(relatedTarget) && this.props.onClosePopover();

  componentDidMount() {
    const { action, onOpen } = this.props;
    if (action === "hover") {
      this.refs.popover._node.addEventListener("mouseleave", this.ms, false);
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
      arrowClass
    } = this.props;

    return (
      <React.Fragment>
        <Popper placement={placement} modifiers={modifiers} ref="popover">
          {({ popperProps, restProps }) => {
            if (/bottom/gi.test(popperProps["data-placement"])) {
              popperProps = {
                ...popperProps,
                ...{
                  style: {
                    ...popperProps.style,
                    ...{ top: (popperProps.style.top += 8.4) }
                  }
                }
              };
            }
            if (/top/gi.test(popperProps["data-placement"])) {
              popperProps = {
                ...popperProps,
                ...{
                  style: {
                    ...popperProps.style,
                    ...{ top: (popperProps.style.top -= 8.4) }
                  }
                }
              };
            }
            if (/left/gi.test(popperProps["data-placement"])) {
              popperProps = {
                ...popperProps,
                ...{
                  style: {
                    ...popperProps.style,
                    ...{ left: (popperProps.style.left -= 8.4) }
                  }
                }
              };
            }
            if (/right/gi.test(popperProps["data-placement"])) {
              popperProps = {
                ...popperProps,
                ...{
                  style: {
                    ...popperProps.style,
                    ...{ left: (popperProps.style.left += 8.4) }
                  }
                }
              };
            }
            popperProps = {
              ...popperProps,
              ...{
                style: {
                  ...popperProps.style,
                  ...{ zIndex: this.props.zIndex + 101 }
                }
              }
            };

            if (motion) {
              const ArrowCallback = arrow ? (
                <ArrowComponent
                  arrowClass={arrowClass}
                  customArrow={customArrow}
                  dataPlacement={popperProps["data-placement"]}
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
                  <React.Fragment>
                    {children[1]}
                    {arrow ? (
                      <ArrowComponent
                        arrowClass={arrowClass}
                        arraySize={this.props.arraySize}
                        customArrow={customArrow}
                        dataPlacement={popperProps["data-placement"]}
                      />
                    ) : null}
                  </React.Fragment>
                </div>
              );
            }

            return (
              <div className={contentClass} {...popperProps}>
                {children[1]}
                {arrow ? (
                  <ArrowComponent
                    arrowClass={arrowClass}
                    customArrow={customArrow}
                    dataPlacement={popperProps["data-placement"]}
                  />
                ) : null}
              </div>
            );
          }}
        </Popper>
        <Overlay
          touch={touch}
          onClosePopover={onClosePopover}
          zIndex={this.props.zIndex}
        />
      </React.Fragment>
    );
  }
}
