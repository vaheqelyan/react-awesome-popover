import React from 'react';
import { Arrow } from 'react-popper';

export default function ArrowComponent({ dataPlacement, customArrow, arrowClass }) {
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
            }
          }
        ] =
          '-8px';

        return customArrow ? (
          <span {...arrowProps} className={arrowClass}>
            {customArrow}
          </span>
        ) : (
          <span {...arrowProps}>
            <div
              className={`arrow-${do {
                if (g == 'left') {
                  ('right');
                } else if (g == 'right') {
                  ('left');
                } else if (g == 'top') {
                  ('bottom');
                } else if (g == 'bottom') {
                  ('up');
                }
              }}`}
            />
          </span>
        );
      }}
    </Arrow>
  );
}
