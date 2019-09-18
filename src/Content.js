import React from "react";
import { DEFAULT_ZINDEX } from "./const";

export default class Content extends React.Component {
	state = { position: null };
	contentRef = React.createRef();
	arrowRef = React.createRef();
	componentDidMount() {
		const { contentRef, arrowRef } = this;
		const { targetRef, arrow, onOpen } = this.props;

		if (onOpen) onOpen();

		const targetBound = targetRef.current.getBoundingClientRect();
		const contentBound = contentRef.current.getBoundingClientRect();

		const atTop = targetBound.y - contentBound.height;
		const atRight = window.innerWidth - (targetBound.right + contentBound.width);
		const atLeft = targetBound.x - contentBound.width;

		const atBottom = window.innerHeight - (targetBound.bottom + contentBound.height);

		let arrowBound = { width: 0, height: 0 },
			arrowClientH = 0;
		if (arrow) {
			arrowBound = arrowRef.current.getBoundingClientRect();
			arrowClientH = arrowRef.current.clientHeight;
		}

		const pos = [
			{
				at: "top-start",
				check1: atTop,
				check2: window.innerWidth - (targetBound.left + contentBound.width),
				check3: 0,
				style: {
					top: -(contentBound.height + arrowClientH / 2),
					left: 0,
				},
				arrow: {
					transform: "rotate(135deg)",
					bottom: -Math.ceil(arrowClientH / 2),
					left: Math.min(targetBound.width / 2, contentBound.width) - arrowBound.width / 2,
				},
			},
			{
				at: "top-center",
				check1: atTop,
				check2: contentBound.x - targetBound.width - contentBound.width / 2 + targetBound.width / 2,
				check3:
					window.innerWidth -
					(contentBound.x - targetBound.width - contentBound.width / 2 + targetBound.width / 2 + contentBound.width),
				style: {
					top: -(contentBound.height + arrowClientH / 2),
					left: -(contentBound.width / 2) + targetBound.width / 2,
				},
				arrow: {
					transform: "rotate(135deg)",
					bottom: -Math.ceil(arrowClientH / 2),
					left: contentBound.width / 2 - arrowBound.width / 2,
				},
			},
			{
				at: "top-end",
				check1: atTop,
				check2: targetBound.right - contentBound.width,
				check3: 0,
				style: {
					top: -(contentBound.height + arrowBound.height / 2),
					left: -(contentBound.width - targetBound.width),
				},
				arrow: {
					transform: "rotate(135deg)",
					bottom: -arrowBound.height / 2,
					right: Math.min(targetBound.width / 2, contentBound.width) - arrowBound.width / 2,
				},
			},
			{
				at: "left-start",
				check1: atLeft,
				check2: window.innerHeight - (targetBound.top + contentBound.height),
				check3: 0,
				style: {
					left: -(contentBound.width + /* padding for arrow */ arrowBound.width / 2),
				},
				arrow: {
					top: Math.min(targetBound.height / 2, contentBound.height) - arrowClientH / 2,
					left: contentBound.width - arrowBound.width / 2,
					transform: `rotate(45deg)`,
				},
			},
			{
				at: "left-center",
				check1: atLeft,
				check2: contentBound.y - (contentBound.height / 2 + targetBound.height / 2),
				check3:
					window.innerHeight -
					(contentBound.y - (contentBound.height / 2 + targetBound.height / 2) + contentBound.height),
				style: {
					left: -(contentBound.width + /* padding for arrow */ arrowBound.width / 2),
					top: -(contentBound.height / 2 - targetBound.height / 2),
				},
				arrow: {
					transform: `rotate(45deg)`,
					left: contentBound.width - arrowBound.width / 2,
					top: contentBound.height / 2 - arrowClientH / 2,
				},
			},
			{
				at: "left-end",
				check1: atLeft,
				check2: targetBound.bottom - contentBound.height,
				check3: 0,
				style: {
					left: -(contentBound.width + arrowBound.width / 2),
					top: -(contentBound.height - targetBound.height),
				},
				arrow: {
					transform: `rotate(45deg)`,
					right: -arrowBound.width / 2,
					bottom: Math.min(targetBound.height / 2, contentBound.height) - arrowClientH / 2,
				},
			},
			{
				at: "right-start",
				check1: atRight,
				check2: window.innerHeight - (targetBound.top + contentBound.height),
				check3: 0,
				style: { left: targetBound.width + arrowBound.width / 2 },
				arrow: {
					transform: `rotate(45deg)`,
					left: -arrowBound.width,
					top: Math.min(targetBound.height / 2, contentBound.height) - arrowClientH / 2,
				},
			},
			{
				at: "right-center",
				check1: atRight,
				check2: contentBound.y - (contentBound.height / 2 + targetBound.height / 2),
				check3:
					window.innerHeight -
					(contentBound.y - (contentBound.height / 2 + targetBound.height / 2) + contentBound.height),
				style: {
					top: -(contentBound.height / 2 - targetBound.height / 2),
					left: targetBound.width + arrowBound.width / 2,
				},
				arrow: {
					left: -arrowBound.width,
					top: contentBound.height / 2 - arrowClientH / 2,
					transform: `rotate(45deg)`,
				},
			},
			{
				at: "right-end",
				check1: atRight,
				check2: targetBound.bottom - contentBound.height,
				check3: 0,
				style: {
					left: targetBound.width + arrowBound.width / 2,
					top: -(contentBound.height - targetBound.height),
				},
				arrow: {
					transform: `rotate(45deg)`,
					left: -arrowBound.width,
					bottom: Math.min(targetBound.height / 2, contentBound.height) - arrowClientH / 2,
				},
			},
			{
				at: "bottom-start",
				check1: atBottom,
				check2: window.innerWidth - (targetBound.left + contentBound.width),
				check3: 0,
				style: {
					top: targetBound.height + arrowBound.height / 2,
					left: 0,
				},
				arrow: {
					transform: `rotate(-45deg)`,
					top: -(arrowBound.height / 2),
					left: Math.min(targetBound.width / 2, contentBound.width) - arrowBound.width / 2,
				},
			},
			{
				at: "bottom-center",
				check1: atBottom,
				check2: contentBound.x - targetBound.width - contentBound.width / 2 + targetBound.width / 2,
				check3:
					window.innerWidth -
					(contentBound.x - targetBound.width - contentBound.width / 2 + targetBound.width / 2 + contentBound.width),
				style: {
					top: targetBound.height + arrowClientH / 2,
					left: -(contentBound.width / 2) + targetBound.width / 2,
				},
				arrow: {
					transform: `rotate(-45deg)`,
					top: -arrowClientH / 2,
					left: contentBound.width / 2 - arrowBound.width / 2,
				},
			},
			{
				at: "bottom-end",
				check1: atBottom,
				check2: atLeft,
				check3: 0,
				style: {
					top: targetBound.height + arrowBound.height / 2,
					left: -(contentBound.width - targetBound.width),
				},
				arrow: {
					transform: `rotate(-45deg)`,
					top: -(arrowBound.height / 2),
					right: Math.min(targetBound.width / 2, contentBound.width) - arrowBound.width / 2,
				},
			},
		];

		if (this.props.placement !== "auto") {
			this.setState({
				position: pos.filter(val => val.at === this.props.placement)[0],
			});
		} else {
			this.setState({
				position: pos.filter(val => val.check1 > 0 && val.check2 > 0 && val.check3 > -1)[0] || pos[9],
			});
		}
	}
	componentWillUnmount() {
		const { onClose } = this.props;
		if (onClose) onClose();
	}
	render() {
		const { position } = this.state;
		const defaultStyle = {
			display: "inline-block",
			position: "absolute",
			zIndex: DEFAULT_ZINDEX + 10,
		};
		const positionStyle = position ? position.style : {};
		const arrowStyle = position ? position.arrow : {};
		const { content, arrow, arrowProps = {} } = this.props;

		const { style = {}, ...arrowRest } = arrowProps;

		return (
			<div style={{ ...defaultStyle, ...positionStyle }} ref={this.contentRef}>
				{arrow ? (
					<div ref={this.arrowRef} style={{ ...{ position: "absolute", ...arrowStyle }, ...style }} {...arrowRest}>
						{"◥"}
					</div>
				) : null}
				{content}
			</div>
		);
	}
}
