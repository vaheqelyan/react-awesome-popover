## React-awesome-popover

<p>
  <a href="https://www.npmjs.com/package/react-awesome-popover"><img  src="https://img.shields.io/npm/v/react-awesome-popover.svg"/></a>
<a href="https://bundlephobia.com/result?p=react-awesome-popover@latest"><img src="https://img.shields.io/bundlephobia/minzip/react-awesome-popover.svg?style=flat-square"/></a>
</p>

[Demo](http://jsfiddle.net/6qogfdkr/418/embedded/result/)

![](https://res.cloudinary.com/dxv8p5zck/image/upload/v1510661171/ezgif.com-crop_vbxgdc.gif)

### Installation

---

**via NPM**

```code
npm i react-awesome-popover
```

**via CDN (unpkg)**

```code
https://unpkg.com/react-awesome-popover@latest/build/index.umd.js
```

UMD library exposed as `ReactAwesomePopover`

```js
const Popover = ReactAwesomePopover;
```

Do not forget to use the stylesheet.

```js
import "react-awesome-popover/build/index.css";
```

### Example

```jsx
ReactDOM.render(
	<Popover>
		<button>The Target</button>
		<div>The content</div>
	</Popover>,
	document.body,
);
```

> The component supports server-side rendering

### You can also use nested popovers

```jsx
ReactDOM.render(
	<Popover>
		<button>The Target</button>
		<div>
			...
			<Popover>
				<button>The Target</button>
				<div>
					...
					<Popover>
						<button>The Target</button>
						<div>The content</div>
					</Popover>
					...
				</div>
			</Popover>
			...
		</div>
	</Popover>,
	document.body,
);
```

### Performing an animation

Set the `renderer` property to `true`. Second child becomes a function, It returns popperProps and arrowProps.
You need to combine popper style with motion style

```jsx
<Popover motion>
	<button>Click</button>
	{(popperProps, Arrow) => (
		<Motion defaultStyle={{ rotateY: 90 }} style={{ rotateY: spring(0) }}>
			{({ rotateY }) => {
				var motionStyle = {
					transform: `${popperProps.style.transform} rotateY(${rotateY}deg)`,
				};
				return (
					<div {...popperProps} style={{ ...popperProps.style, ...motionStyle }}>
						<h1>React-motion!</h1>
						{Arrow}
					</div>
				);
			}}
		</Motion>
	)}
</Popover>
```

### You can also use as a tooltip.

Very simple!.

![](http://res.cloudinary.com/dmtrk3yns/image/upload/c_scale,q_auto,w_278/v1536139578/ezgif.com-video-to-gif_6_sqhep4.gif)

```jsx
ReactDOM.render(
	<Popover>
		<button>The Target</button>
		<div>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus error laudantium incidunt vitae dignissimos
			praesentium nesciunt,
			<Popover action="hover" placement="top">
				<b>pariatur provident natus</b>
				<div>Wow man</div>
			</Popover>
			aperiam, corporis, quo libero sapiente recusandae! Distinctio deserunt dolor sequi, i
		</div>
	</Popover>,
	document.getElementById("app"),
);
```

### What about the arrow?

Starting from version 4.0.0, this component does not use the svg arrow. Basically you need to handle the arrow with css.

> Arrow is built using css

```css
.rap-popper-div-arrow[data-placement*="bottom"] {
	margin-top: -0.6em; /* argin of arrow */
}

.rap-popper-div-arrow[data-placement*="bottom"]::before {
	border-width: 0 1em 0.6em 1em; /* ontrole the dimensions for the arrow */
	border-color: transparent transparent #e3e3e3 transparent; /*set the color for the arrow */
}
```

**But what if I want the shadow to surround the arrow ?**. [demo](demo)
I think that you have no choice but to use [drop-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow).

> You can also hide the lower shadow of the arrow using the div

There is also one solution using a filter

Without using `filter`

![](https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto/v1555148214/react-awesome-popover/no-shadow_ice_screenshot_20190413-132935.png)

![](https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto/v1555148214/react-awesome-popover/no-shadow_ice_screenshot_20190413-133055.png)

With filters
![](https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto/v1555148214/react-awesome-popover/shadow_ice_screenshot_20190413-133520.png)

![](https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto/v1555148214/react-awesome-popover/shadow_ice_screenshot_20190413-133546.png)

### Props

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>arrow</td>
    <td>Boolean</td>
    <td>If  <code>false</code>, the arrow is removed</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>placement</td>
    <td>String</td>
    <td>The placement of the popover.<br/> The default value is auto  <a href="https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#popperplacements--enum">Popper.js placement</a></td>
    <td><code>auto</code></td>
  </tr>
  <tr>
    <td>action</td>
    <td>String</td>
    <td><code>click | hover | touch</code></td>
    <td><code>click</code></td>
  </tr>
  <tr>
    <td>onOpen</td>
    <td>Function</td>
    <td>The callback is called before opening</td>
    <td></td>
  </tr>
  <tr>
    <td>onClose</td>
    <td>Function</td>
    <td>Callback is called before closing</td>
    <td></td>
  </tr>
  <tr>
  <td>renderer</td>
  <td>Boolean</td>
  <td>Custom renderer (returns function)</td>
  <td><code>false</code></td>
  </tr>
  <tr>
    <td>modifiers</td>
    <td>Object</td>
    <td>Allow passing <a href="https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object">Popper modifiers</a> as props.</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>open</td>
    <td>Boolean</td>
    <td>Whether the popover is visible. Passing this prop puts the popover in controlled mode.To make the popover completely manageable, you must pass the <code>null</code> value to the <code>action</code> prop</td>
    <td><code>false</code></td>
  </tr>
  <tr>
  <td>initZindex</td>
  <td>Number</td>
  <td>Initial number for zIndex for item</td>
  <td><code>100</code></td>
</tr>
</table>
