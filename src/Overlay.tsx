import * as React from "react";
import { ActionProp } from "./Popover";

export interface IProps {
	onClose: () => void;
	zIndex: number;
	action: ActionProp;
}

// Later I will use the mapped object type
interface IRestProps {
	onClick?: () => void;
	onMouseEnter?: () => void;
	onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const Overlay: React.SFC<IProps> = ({ zIndex, action, onClose }) => {
	const onClick = () => onClose();
	const onMouseEnter = () => onClose();

	const style = { zIndex: zIndex + 100 };
	const restProps: IRestProps = {};
	if (action === "click") {
		restProps.onClick = onClick;
	} else if (action === "hover") {
		restProps.onMouseEnter = onMouseEnter;
	} else if (action === "touch") {
		restProps.onTouchStart = onClick;
	}
	return <div style={style} className="rap-overlay" {...restProps} />;
};

export default Overlay;
