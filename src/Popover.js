import React from "react";
import Target from "./Target";
import Content from "./Content";
import Overlay from "./Overlay";
import { DEFAULT_ZINDEX } from "./const";

export default class Popover extends React.Component {
	state = { open: this.props.open || false };
	target = React.createRef();

	setOpen = () => {
		this.setState({ open: !this.state.open });
	};
	componentDidUpdate(prevProps) {
		if (prevProps.open !== this.props.open) {
			this.setState({ open: this.props.open });
		}
	}
	render() {
		const { props } = this;
		const {
			placement = "auto",
			arrow = true,
			action = "click",
			zIndex = DEFAULT_ZINDEX,
			preventDefault,
			stopPropagation,
			onOpen,
			onClose,
			children,
			style,
			overlayColor,
			arrowProps,
			...rest
		} = props;

		const [target, content] = children;

		return (
			<div style={{ ...{ position: "relative" }, ...style }} {...rest}>
				<Target
					preventDefault={preventDefault}
					stopPropagation={stopPropagation}
					targetRef={this.target}
					open={this.state.open}
					zIndex={zIndex}
					action={action}
					setOpen={this.setOpen}
				>
					{target}
				</Target>
				{this.state.open && (
					<React.Fragment>
						<Content
							arrowProps={arrowProps}
							zIndex={zIndex}
							arrow={arrow}
							placement={placement}
							targetRef={this.target}
							content={content}
							onClose={onClose}
							onOpen={onOpen}
						/>
						<Overlay
							preventDefault={preventDefault}
							stopPropagation={stopPropagation}
							overlayColor={overlayColor}
							onClose={this.setOpen}
							zIndex={zIndex}
							action={action}
							setOpen={this.setOpen}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}
