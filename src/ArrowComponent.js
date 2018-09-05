import React from 'react';
import { Arrow } from 'react-popper';

export default function ArrowComponent({ dataPlacement, customArrow, arrowClass, arrowFill }) {
  return (
    <Arrow>
      {({ arrowProps }) => {
        let g = dataPlacement && dataPlacement.split('-')[0];
        arrowProps.style.position = 'absolute';

        arrowProps.style[
          do {
            if (g == 'right') {
              ('left');
            } else if (g == 'left') {
              ('right');
            } else if (g == 'bottom') {
              ('top');
            } else if (g == 'top') {
              ('bottom');
            }
          }
        ] =
          g == 'top' ? '-12px' : '-8px';

        const id = Math.random();
        return customArrow ? (
          <span {...arrowProps} className={arrowClass}>
            {customArrow}
          </span>
        ) : (
          <span {...arrowProps} className={arrowClass}>
            <svg
              className={
                do {
                  if (g == 'right') {
                    ('ar');
                  } else if (g == 'top') {
                    ('at');
                  } else if (g == 'bottom') {
                    ('ab');
                  }
                }
              }
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 30 100"
              version="1.1"
              x="0px"
              y="0px"
              width={30}
              height={30}
            >
              <defs xmlns="http://www.w3.org/2000/svg">
                <filter id={id} height="130%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation={5} />
                  <feOffset dx="2.6" dy="1.6" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polygon filter={`url(#${id})`} points="36 23 64 55 36 80" fill={arrowFill} fillRule="evenodd" />
            </svg>
          </span>
        );
      }}
    </Arrow>
  );
}
