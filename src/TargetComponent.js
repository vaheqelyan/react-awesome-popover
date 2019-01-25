import React from 'react';
import cc from 'classcat';

import { Target } from 'react-popper';
import isOverlay from './isOverlay';

export default function TargetComponent({
  zIndex,
  isOpen,
  id,
  children,
  targetClass,
  action,
  touch,
  tooglePopover,
  openPopover,
  closePopover
}) {
  function click() {
    tooglePopover();
  }

  function onMouseEnter() {
    openPopover();
  }

  function onMouseLeave({ relatedTarget: el }) {
    if (isOverlay(el)) {
      closePopover();
      return;
    }

    var target = el.closest('.rap-target-container');
    if (target) {
      if (target.hasAttribute('data-target-id')) {
        var attr = target.getAttribute('data-target-id');
        if (attr != id) {
          closePopover();
        }
      }
    }
  }

  const style = isOpen ? { zIndex: zIndex + 101 } : { zIndex: zIndex };

  const eventProps = {};

  if (action) {
    if (action == 'click') {
      if (touch) {
        eventProps.onTouchStart = click;
      } else {
        eventProps.onMouseDown = click;
      }
    } else {
      eventProps.onMouseEnter = onMouseEnter;
      eventProps.onMouseLeave = onMouseLeave;
    }
  }

  return (
    <Target>
      {({ targetProps }) => (
        <div
          data-target-id={id}
          className={cc({
            'rap-target-container': true,
            [targetClass]: targetClass
          })}
          style={style}
          {...eventProps}
          {...targetProps}
        >
          {children}
        </div>
      )}
    </Target>
  );
}