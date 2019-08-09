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
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const Target: React.SFC<IProps> = ({ isOpen, zIndex, target, action, onOpen, onClose, onClick, onTouchStart }) => {
	const onClickTarget = (e: React.MouseEvent<HTMLDivElement>) => {
		onClick(e);
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	};
	const onTouchTarget = (e: React.TouchEvent<HTMLDivElement>) => {
		onTouchStart(e);
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
		restProps.onClick = onClickTarget;
	} else if (action === "hover") {
		restProps.onMouseOver = onMouseOver;
		if (isOpen) {
			restProps.onMouseOut = onMouseOut;
		}
	} else if (action === "touch") {
		restProps.onTouchStart = onTouchTarget;
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
