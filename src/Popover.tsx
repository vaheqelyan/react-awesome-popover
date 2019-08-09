import * as React from "react";
import * as ReactPopper from "react-popper";
import Content from "./Content";
import Target from "./Target";

const { Manager } = ReactPopper;

export type ActionProp = "click" | "hover" | "touch";

export interface IArrowProps {
	className: "rap-popper-div-arrow";
	ref: ReactPopper.RefHandler;
	style: React.CSSProperties;
	"data-placement": ReactPopper.Placement;
}

export interface IPopperProps {
	className: "rap-popper-div";
	style: React.CSSProperties;
	ref: ReactPopper.RefHandler;
}

export interface IProps {
	positionFixed?: boolean;
	onOpen: () => void;
	onClose: () => void;
	placement: ReactPopper.Placement;
	modifiers: ReactPopper.Modifiers;
	arrow: boolean;
	action: ActionProp;
	open: boolean;
	renderer: boolean;
	onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	initZindex: number;
	children: {
		target: React.ReactNode;
		content: (popperProps: IPopperProps, arrowProps?: IArrowProps) => React.ReactNode | React.ReactNode;
	};
}

export interface IState {
	isOpen: boolean;
	zIndex: number;
}

export default class Popover extends React.Component<IProps, IState> {
	public static defaultProps = {
		placement: "auto",
		modifiers: {},
		arrow: true,
		action: "click",
		open: false,
		renderer: false,
		initZindex: 100,
		positionFixed: false,
	};
	constructor(props: IProps) {
		super(props);
		this.state = {
			isOpen: props.open,
			zIndex: props.initZindex,
		};
	}

	public openPopover = () => {
		this.setState({ isOpen: true });
	};
	public tooglePopover = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	public closePopover = () => {
		this.setState({ isOpen: false });
	};

	public componentDidUpdate(prevProps: IProps) {
		if (prevProps.open !== this.props.open) {
			this.setState({ isOpen: this.props.open });
		}
	}
	public onClose = () => {
		const { onClose } = this.props;
		if (onClose) {
			onClose();
		}
		this.closePopover();
	};

	public onOpen = () => {
		const { onOpen } = this.props;
		if (onOpen) {
			onOpen();
		}
		this.openPopover();
	};

	public render() {
		const { children, placement, modifiers, action, arrow, renderer, positionFixed } = this.props;
		// @ts-ignore
		const [target, content] = children;

		// console.log(target,content)
		// console.log(children)

		const { isOpen, zIndex } = this.state;

		const ContentRef = (
			<Content
				positionFixed={positionFixed}
				children={children}
				renderer={renderer}
				onClose={this.onClose}
				content={content as any}
				placement={placement}
				modifiers={modifiers}
				isOpen={isOpen}
				zIndex={zIndex}
				action={action}
				arrow={arrow}
			/>
		);

		return (
			<Manager>
				<Target
					action={action}
					onClose={this.onClose}
					target={target}
					isOpen={isOpen}
					zIndex={zIndex}
					onOpen={this.onOpen}
					onClick={this.props.onClick}
					onTouchStart={this.props.onTouchStart}
				/>

				{isOpen && ContentRef}
			</Manager>
		);
	}
}
