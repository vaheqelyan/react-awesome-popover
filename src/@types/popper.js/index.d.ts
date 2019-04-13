declare module "popper.js" {
	export type Position = "top" | "right" | "bottom" | "left";

	export type Placement =
		| "auto-start"
		| "auto"
		| "auto-end"
		| "top-start"
		| "top"
		| "top-end"
		| "right-start"
		| "right"
		| "right-end"
		| "bottom-end"
		| "bottom"
		| "bottom-start"
		| "left-end"
		| "left"
		| "left-start";

	export type Boundary = "scrollParent" | "viewport" | "window";

	export type Behavior = "flip" | "clockwise" | "counterclockwise";

	export type ModifierFn = (data: Data, options: Object) => Data;

	export interface Attributes {
		"x-out-of-boundaries": "" | false;
		"x-placement": Placement;
	}

	export interface Padding {
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	}

	export interface BaseModifier {
		order?: number;
		enabled?: boolean;
		fn?: ModifierFn;
	}

	export interface Modifiers {
		shift?: BaseModifier;
		offset?: BaseModifier & {
			offset?: number | string;
		};
		preventOverflow?: BaseModifier & {
			priority?: Position[];
			padding?: number | Padding;
			boundariesElement?: Boundary | Element;
			escapeWithReference?: boolean;
		};
		keepTogether?: BaseModifier;
		arrow?: BaseModifier & {
			element?: string | Element;
		};
		flip?: BaseModifier & {
			behavior?: Behavior | Position[];
			padding?: number | Padding;
			boundariesElement?: Boundary | Element;
			flipVariations?: boolean;
			flipVariationsByContent?: boolean;
		};
		inner?: BaseModifier;
		hide?: BaseModifier;
		applyStyle?: BaseModifier & {
			onLoad?: Function;
			gpuAcceleration?: boolean;
		};
		computeStyle?: BaseModifier & {
			gpuAcceleration?: boolean;
			x?: "bottom" | "top";
			y?: "left" | "right";
		};

		[name: string]: (BaseModifier & Record<string, any>) | undefined;
	}

	export interface Offset {
		top: number;
		left: number;
		width: number;
		height: number;
	}

	export interface Data {
		instance: Popper;
		placement: Placement;
		originalPlacement: Placement;
		flipped: boolean;
		hide: boolean;
		arrowElement: Element;
		styles: CSSStyleDeclaration;
		arrowStyles: CSSStyleDeclaration;
		attributes: Attributes;
		boundaries: Object;
		offsets: {
			popper: Offset;
			reference: Offset;
			arrow: {
				top: number;
				left: number;
			};
		};
	}

	export interface PopperOptions {
		placement?: Placement;
		positionFixed?: boolean;
		eventsEnabled?: boolean;
		modifiers?: Modifiers;
		removeOnDestroy?: boolean;

		onCreate?(data: Data): void;

		onUpdate?(data: Data): void;
	}

	export interface ReferenceObject {
		clientHeight: number;
		clientWidth: number;

		getBoundingClientRect(): ClientRect;
	}

	export class Popper {
		static modifiers: (BaseModifier & { name: string })[];
		static placements: Placement[];
		static Defaults: PopperOptions;

		options: PopperOptions;
		popper: Element;
		reference: Element | ReferenceObject;

		constructor(reference: Element | ReferenceObject, popper: Element, options?: PopperOptions);

		destroy(): void;

		update(): void;

		scheduleUpdate(): void;

		enableEventListeners(): void;

		disableEventListeners(): void;
	}
}
