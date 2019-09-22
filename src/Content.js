import React from "react";
import { DEFAULT_ZINDEX } from "./const";

export default class Content extends React.Component {
	state = { position: null };
	contentRef = React.createRef();
	arrowRef = React.createRef();
	componentDidMount() {
		const { contentRef, arrowRef } = this;
		const { targetRef, arrow, onOpen, placement } = this.props;

		if (onOpen) onOpen();

		const targetBound = targetRef.current.getBoundingClientRect();
		const contentBound = contentRef.current.getBoundingClientRect();

		let arrowBound = { width: 0, height: 0 };
		if (arrow) {
			arrowBound = arrowRef.current.getBoundingClientRect();
		}

		const { innerWidth, innerHeight } = window;

		const calcCoverLeft = contentBound.x - contentBound.width;
		const coverLeft = calcCoverLeft < 0 ? calcCoverLeft : 0;

		const calcCoverRight = contentBound.x + targetBound.width + contentBound.width;
		const coverRight = calcCoverRight > innerWidth ? innerWidth - calcCoverRight : 0;

		const calcCoverTop = contentBound.y - contentBound.height;
		const coverTop = calcCoverTop < 0 ? calcCoverTop : 0;

		const calcCoverBottom = targetBound.bottom + contentBound.height;
		const coverBottom = calcCoverBottom > innerHeight ? innerHeight - calcCoverBottom : 0;

		const calcXCenterLeft = contentBound.x + targetBound.width / 2 - contentBound.width / 2;

		const calcXCenterRight = contentBound.x + targetBound.width / 2 - contentBound.width / 2 + contentBound.width;

		const coverXCenterLeft = calcXCenterLeft < 0 ? calcXCenterLeft : 0;

		const coverXCenterRight = calcXCenterRight > innerWidth ? innerWidth - calcXCenterRight : 0;

		const calcYCenterTop = contentBound.y + targetBound.height / 2 - contentBound.height / 2;

		const coverYCenterTop = calcYCenterTop < 0 ? calcYCenterTop : 0;

		const calcYCenterBottom = contentBound.y + targetBound.height / 2 - contentBound.height / 2 + contentBound.height;

		const coverYCenterBottom = calcYCenterBottom > innerHeight ? calcYCenterBottom : 0;

		const calcTopStart = contentBound.x + contentBound.width;
		const coverTopStart = calcTopStart > innerWidth ? innerWidth - calcTopStart : 0;

		const calcTopEnd = contentBound.x - (contentBound.width - targetBound.width);
		const coverTopEnd = calcTopEnd < 0 ? calcTopEnd : 0;

		const calcLeftEndTop = contentBound.y - (contentBound.height - targetBound.height);
		const coverLeftEndTop = calcLeftEndTop < 0 ? calcLeftEndTop : 0;

		const coverRightEndTop = coverLeftEndTop;

		const calcLefStartBottom = contentBound.y + contentBound.height;
		const coverLeftStartBottom = calcLefStartBottom > innerHeight ? innerHeight - calcLefStartBottom : 0;

		const coverRightStartBottom = coverLeftStartBottom;

		const coverBottomStartRight = coverTopStart;
		const coverBottomEndLeft = coverTopEnd;

		const xCenterStyle = targetBound.height / 2 - contentBound.height / 2;
		const rightLeftEnd = -(contentBound.height - targetBound.height);
		const topBottomEnd = -(contentBound.width - targetBound.width);
		const topBottomCenter = targetBound.width / 2 - contentBound.width / 2;

		const computeArrowW = arrowBound.width / 2;
		const computearrowH = arrowBound.height / 2;

		const leftLeftStyle = -(contentBound.width + computeArrowW);
		const topTopStyle = -(contentBound.height + arrowBound.height / 2);
		const rightLeftStyle = targetBound.width + computeArrowW;
		const bottomTopStyle = targetBound.height + computearrowH;

		const styles = {
			topStart: { top: topTopStyle },
			topCenter: { top: topTopStyle, left: topBottomCenter },
			topEnd: { top: topTopStyle, left: topBottomEnd },

			leftStart: { left: leftLeftStyle },
			leftCenter: {
				left: leftLeftStyle,
				top: xCenterStyle,
			},
			leftEnd: { top: rightLeftEnd, left: leftLeftStyle },

			rightStart: { left: rightLeftStyle },
			rightCenter: { left: rightLeftStyle, top: xCenterStyle },
			rightEnd: { left: rightLeftStyle, top: rightLeftEnd },

			bottomStart: { top: bottomTopStyle },
			bottomCenter: { top: bottomTopStyle, left: topBottomCenter },
			bottomEnd: { top: bottomTopStyle, left: topBottomEnd },
		};

		const transform = {
			bottom: {
				transform: "rotate(-45deg)",
			},
			top: {
				transform: "rotate(135deg)",
			},
			left: {
				transform: "rotate(45deg)",
			},
			right: {
				transform: "rotate(45deg)",
			},
		};

		const arrowBottomTop = Math.ceil(-arrowBound.height / 2);

		const arrowBottomTopCenter = contentBound.width / 2 - arrowBound.width / 2;

		const arrowTop = contentBound.height - arrowBound.height / 2;
		const arrowTopBottomEnd = targetBound.width / 2 - arrowBound.width / 2;

		const arrowLeftRightEnd = contentBound.height - arrowBound.height / 2 - targetBound.height / 2;

		const arrowLeftRightCenter = contentBound.height / 2 - Math.ceil(arrowBound.height / 2);
		const arrowTopBottomStartLeft = targetBound.width / 2 - arrowBound.width / 2;

		const arrowLeftLeft = Math.ceil(contentBound.width - arrowBound.width / 2);
		const arrowLeftRightTop = targetBound.height / 2 - arrowBound.height / 2;

		const arrowStyle = {
			topStart: {
				...transform.top,
				top: arrowTop,
				left: arrowTopBottomStartLeft,
			},
			topCenter: {
				...transform.top,
				top: arrowTop,
				left: arrowBottomTopCenter,
			},
			topEnd: {
				...transform.top,
				top: arrowTop,
				right: arrowTopBottomEnd,
			},
			leftStart: {
				...transform.left,
				left: arrowLeftLeft,
				top: arrowLeftRightTop,
			},

			leftCenter: {
				...transform.left,
				left: arrowLeftLeft,
				top: arrowLeftRightCenter,
			},

			leftEnd: {
				...transform.left,
				left: arrowLeftLeft,
				top: arrowLeftRightEnd,
			},
			rightStart: {
				...transform.right,
				left: -arrowBound.width,
				top: arrowLeftRightTop,
			},

			rightCenter: {
				...transform.right,
				left: -arrowBound.width,
				top: arrowLeftRightCenter,
			},
			rightEnd: {
				...transform.right,
				left: -arrowBound.width,
				top: arrowLeftRightEnd,
			},
			bottomStart: {
				...transform.bottom,
				top: arrowBottomTop,
				left: arrowTopBottomStartLeft,
			},
			bottomCenter: {
				...transform.bottom,
				top: arrowBottomTop,
				left: arrowBottomTopCenter,
			},
			bottomEnd: {
				...transform.bottom,
				top: arrowBottomTop,
				right: arrowTopBottomEnd,
			},
		};

		const pos = [
			{
				at: "top-start",
				cover: [coverTop, coverTopStart, 0],
				style: styles.topStart,
				arrow: arrowStyle.topStart,
			},
			{
				at: "top-center",
				cover: [coverTop, coverXCenterLeft, coverXCenterRight],
				style: styles.topCenter,
				arrow: arrowStyle.topCenter,
			},
			{
				at: "top-end",
				cover: [coverTop, coverTopEnd, 0],
				style: styles.topEnd,
				arrow: arrowStyle.topEnd,
			},
			{
				at: "left-start",
				cover: [coverLeft, coverLeftStartBottom, 0],
				style: styles.leftStart,
				arrow: arrowStyle.leftStart,
			},
			{
				at: "left-center",
				cover: [coverLeft, coverYCenterTop, coverYCenterBottom],
				style: styles.leftCenter,
				arrow: arrowStyle.leftCenter,
			},
			{
				at: "left-end",
				cover: [coverLeft, coverLeftEndTop, 0],
				style: styles.leftEnd,
				arrow: arrowStyle.leftEnd,
			},
			{
				at: "right-start",
				cover: [coverRight, coverRightStartBottom, 0],
				style: styles.rightStart,
				arrow: arrowStyle.rightStart,
			},
			{
				at: "right-center",
				cover: [coverRight, coverYCenterTop, coverYCenterBottom],
				style: styles.rightCenter,
				arrow: arrowStyle.rightCenter,
			},
			{
				at: "right-end",
				cover: [coverRight, coverRightEndTop, 0],
				style: styles.rightEnd,
				arrow: arrowStyle.rightEnd,
			},
			{
				at: "bottom-start",
				cover: [coverBottom, coverBottomStartRight, 0],
				style: styles.bottomStart,
				arrow: arrowStyle.bottomStart,
			},
			{
				at: "bottom-center",
				cover: [coverBottom, coverXCenterLeft, coverXCenterRight],
				style: styles.bottomCenter,
				arrow: arrowStyle.bottomCenter,
			},
			{
				at: "bottom-end",
				cover: [coverBottom, coverBottomEndLeft, 0],
				style: styles.bottomEnd,
				arrow: arrowStyle.bottomEnd,
			},
		];

		let get;

		if (placement === "auto") {
			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			const compute = pos.map(({ cover }) => cover.reduce(reducer));
			const findIndex = compute.indexOf(Math.max(...compute));
			const result = pos[findIndex];
			get = result;
		} else {
			get = pos.filter(val => val.at === placement)[0];
		}

		this.setState({
			position: get,
		});
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
			left: 0,
			top: 0,
			zIndex: DEFAULT_ZINDEX + 10,
		};
		const positionStyle = position ? position.style : {};
		const arrowStyle = position ? position.arrow : {};
		const { content, arrow, arrowProps = {} } = this.props;

		const { style = {}, ...arrowRest } = arrowProps;

		return (
			<div style={{ ...defaultStyle, ...positionStyle }} ref={this.contentRef}>
				{arrow ? (
					<div ref={this.arrowRef} style={{ ...{ position: "absolute", top: 0, ...arrowStyle }, ...style }} {...arrowRest}>
						{"◥"}
					</div>
				) : null}
				{content}
			</div>
		);
	}
}
