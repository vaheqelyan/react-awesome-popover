import React from "react";
import { Arrow } from "react-popper";
import randomID from "random-id";

class ArrowComponent extends React.Component {
  constructor() {
    super();
    this.id = randomID(19, "a");
  }
  render() {
    const { dataPlacement, customArrow } = this.props;
    const { id } = this;
    return (
      <Arrow>
        {({ arrowProps }) => {
          arrowProps.style.position = "absolute";
          if (/right/gi.test(dataPlacement)) {
            arrowProps.style.transform = "rotate(-180deg)";
            arrowProps.style.left = "-19px";
          } else if (/bottom/gi.test(dataPlacement)) {
            arrowProps.style.transform = "rotate(-90deg)";
            arrowProps.style.top = "-20px";
          } else if (/top/gi.test(dataPlacement)) {
            arrowProps.style.transform = "rotate(90deg)";
            arrowProps.style.bottom = "-21px";
          } else if (/left/gi.test(dataPlacement)) {
            arrowProps.style.right = "-19px";
          }

          return customArrow ? (
            <span {...arrowProps}>{customArrow}</span>
          ) : (
            <span {...arrowProps}>
              <svg
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 100 100"
                version="1.1"
                x="0px"
                y="0px"
                width={30}
                height={30}
              >
                <defs xmlns="http://www.w3.org/2000/svg">
                  <filter id={id} height="130%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation={3} />
                    <feOffset dx={7} dy={1} result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <polygon
                  filter={`url(#${id})`}
                  points="36 23 64 55 36 80"
                  fill="#fff"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          );
        }}
      </Arrow>
    );
  }
}

export default ArrowComponent;
