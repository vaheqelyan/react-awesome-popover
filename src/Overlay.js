import React from "react";

const Overlay = ({ onClose, overlayColor = "rgba(0,0,0,0.5)", zIndex, action, setOpen, preventDefault, stopPropagation }) => {
	const onClick = e => {
		if (preventDefault) e.preventDefault();
		if (stopPropagation) e.stopPropagation();
		onClose();
	};

	const actions =
		action === "click"
			? {
					onClick: onClick,
					onTouchEnd: onClick,
			  }
			: action === "hover"
			? {
					onMouseEnter: setOpen,
			  }
			: {};

	return (
		<div
			style={{
				backgroundColor: overlayColor,
				position: "fixed",
				width: "100%",
				height: "100%",
				top: 0,
				left: 0,
				cursor: "pointer",
				zIndex: zIndex,
			}}
			{...actions}
		/>
	);
};

export default Overlay;
