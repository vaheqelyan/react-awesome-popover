import * as React from "react";
import * as ReactPopper from "react-popper";
import { Popper } from "react-popper";
import Overlay from "./Overlay";
import { ActionProp, IArrowProps, IPopperProps } from "./Popover";

// Will extend later
export interface IProps {
	content: (popperProps: IPopperProps, arrowProps?: IArrowProps) => React.ReactNode | React.ReactNode;
	isOpen: boolean;
	zIndex: number;
	onClose: () => void;
	placement: ReactPopper.Placement;
	modifiers: ReactPopper.Modifiers;
	action: ActionProp;
	arrow: boolean;
	renderer: boolean;
	positionFixed?: boolean;
}

const Content: React.SFC<IProps> = ({
	placement,
	modifiers,
	renderer,
	arrow,
	content,
	zIndex,
	isOpen,
	action,
	positionFixed,
	onClose,
}) => {
	const concatStyle = { zIndex: isOpen ? zIndex + 101 : zIndex };

	return (
		<React.Fragment>
			<Popper positionFixed={positionFixed} placement={placement} modifiers={modifiers}>
				{({ ref, style, placement, arrowProps }) => {
					if (renderer) {
						const popperProps: IPopperProps = {
							style,
							ref,
							className: "rap-popper-div",
						};
						if (arrow) {
							const popoverArrow: IArrowProps = {
								className: "rap-popper-div-arrow",
								style: arrowProps.style,
								"data-placement": placement,
								ref: arrowProps.ref,
							};
							return content(popperProps, popoverArrow);
						}
						return content(popperProps);
					}

					return (
						<div ref={ref} style={{ ...style, ...concatStyle }} className="rap-popper-div">
							{content}
							{arrow && (
								<React.Fragment>
									<div
										ref={arrowProps.ref}
										data-placement={placement}
										style={arrowProps.style}
										className="rap-popper-div-arrow"
									/>
									<div className="rap-hide-bottom-shadow" />
								</React.Fragment>
							)}
						</div>
					);
				}}
			</Popper>
			<Overlay action={action} zIndex={zIndex} onClose={onClose} />
		</React.Fragment>
	);
};

export default Content;
