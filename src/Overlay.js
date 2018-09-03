import React from 'react';

export default function Overlay({ onClosePopover, zIndex, touch }) {
  let props = { [touch ? 'onTouchStart' : 'onMouseDown']: onClosePopover };

  return (
    <div
      id="rap-overlay"
      style={{
        zIndex: zIndex + 100
      }}
      {...props}
    />
  );
}
