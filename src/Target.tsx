import * as React from "react";
import { Reference } from "react-popper";
import { ActionProp } from "./Popover";

// Later I will use the mapped object type
interface IRestProps {
	onMouseOver?: () => void;
	onMouseEnter?: () => void;
	onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
}

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	zIndex: number;
	action: ActionProp;
	target: React.ReactNode;
}

const Target: React.SFC<IProps> = ({ isOpen, zIndex, target, action, onOpen, onClose }) => {
	const onClick = () => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	};
	const onMouseOver = () => onOpen();
	const onMouseOut = ({ relatedTarget }: React.MouseEvent<HTMLDivElement>) => {
		if (relatedTarget && (relatedTarget as HTMLElement).classList) {
			if ((relatedTarget as HTMLElement).classList.contains("rap-overlay")) {
				onClose();
			}
		}
	};

	const style = { zIndex: isOpen ? zIndex + 101 : zIndex };

	const restProps: IRestProps = {};

	if (action === "click") {
		restProps.onClick = onClick;
	} else if (action === "hover") {
		restProps.onMouseOver = onMouseOver;
		if (isOpen) {
			restProps.onMouseOut = onMouseOut;
		}
	} else if (action === "touch") {
		restProps.onTouchStart = onClick;
	}

	return (
		<Reference>
			{({ ref }) => (
				<div ref={ref} className="rap-ref-div" style={style} {...restProps}>
					{target}
				</div>
			)}
		</Reference>
	);
};

export default Target;
