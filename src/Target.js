import React from "react";

const Target = ({ open, zIndex, children, action, targetRef, setOpen, preventDefault, stopPropagation }) => {
	const onClick = e => {
		if (preventDefault) e.preventDefault();
		if (stopPropagation) e.stopPropagation();
		setOpen();
	};

	const onMouseOut = ({ relatedTarget }) => {
		if (relatedTarget.id === "overlay") {
			setOpen();
		}
	};

	const defaultStyle = { display: "inline-block", position: "relative" };
	const zIndexStyle = open ? { zIndex: zIndex + 10 } : {};

	const actions =
		action === "click"
			? {
					onClick: onClick,
					onTouchEnd: onClick,
			  }
			: action === "hover"
			? {
					onMouseOver: setOpen,
					onMouseOut: onMouseOut,
			  }
			: {};

	return (
		<div style={{ ...defaultStyle, ...zIndexStyle }} ref={targetRef} {...actions}>
			{children}
		</div>
	);
};

export default Target;
