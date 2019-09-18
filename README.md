> Starting with v5.0.0, this component is no longer based on (Popper.js)[https://github.com/FezVrasta/popper.js], which used react-popper. to use (react-popper)[https://github.com/FezVrasta/react-popper] based popover you must use version [v4.1.0](https://github.com/vaheqelyan/react-awesome-popover/tree/v4.1.0)

## React-awesome-popover

<p>
  <a href="https://www.npmjs.com/package/react-awesome-popover"><img  src="https://img.shields.io/npm/v/react-awesome-popover?style=for-the-badge"/></a>
<a href="https://bundlephobia.com/result?p=react-awesome-popover@latest"><img src="https://img.shields.io/bundlephobia/min/react-awesome-popover?style=for-the-badge"/></a>
</p>

[Demo](http://jsfiddle.net/6qogfdkr/419/embedded/result/)

![](https://res.cloudinary.com/dmtrk3yns/image/upload/q_auto/v1568812281/react-awesome-popover/ezgif-5-6832e82b1255.gif)

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
  document.body
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
  document.body
);
```

### Performing an animation

```jsx
<Popover>
  <button>Click</button>
  <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
    {style => {
      return (
        <div style={style}>
          <h3>Popover</h3>
        </div>
      );
    }}
  </Motion>
</Popover>
```

### You can also use as a tooltip.

Very simple!.

![](http://res.cloudinary.com/dmtrk3yns/image/upload/c_scale,q_auto,w_278/v1536139578/ezgif.com-video-to-gif_6_sqhep4.gif)

```jsx
<Popover>
  <button>The Target</button>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus error
    laudantium incidunt vitae dignissimos praesentium nesciunt,
    <Popover action="hover" placement="top">
      <b>pariatur provident natus</b>
      <div>Wow man</div>
    </Popover>
    aperiam, corporis, quo libero sapiente recusandae! Distinctio deserunt dolor
    sequi, i
  </div>
</Popover>
```

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
    <td>The placement of the popover.<br/> <code>top-start</code><code>top-center</code><code>top-end</code><code>left-start</code><code>left-center</code><code>left-end</code><code>right-start</code><code>right-center</code><code>right-end</code><code>bottom-start</code><code>bottom-center</code><code>bottom-end</code></td>
    <td><code>auto</code></td>
  </tr>
  <tr>
    <td>action</td>
    <td>String</td>
    <td><code>click | hover</code>. Supports touch event</td>
    <td><code>click</code></td>
  </tr>
  <tr>
    <td>onOpen</td>
    <td>Function</td>
    <td>The callback is called when the content is mounted</td>
    <td></td>
  </tr>
  <tr>
    <td>onClose</td>
    <td>Function</td>
    <td>The callback is called after the content is unmounted from the dom</td>
    <td></td>
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
  <td><code>1000</code></td>
</tr>
  
    <tr>
  <td>overlayColor</td>
  <td>String</td>
  <td>Set the background color of an overlay element</td>
  <td><code>rgba(0,0,0,0.5)</code></td>
</tr>

<tr>
  <td>arrowProps</td>
  <td>Object</td>
  <td>Pass any prop to the div element that wraps the arrow</td>
  <td><code>{}</code></td>
</tr>
  
  <tr>
  <td>preventDefault</td>
  <td>Boolean</td>
  <td>Cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.<a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault" target="_blank">more</a></td>
  <td></td>
</tr>
  
  
    <tr>
  <td>stopPropagation</td>
  <td>Object</td>
  <td>Stops the bubbling of an event to parent elements, preventing any parent event handlers from being executed. <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation" target="_blank">more</a></td>
  <td></td>
</tr>
  
  
</table>
