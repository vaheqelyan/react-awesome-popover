
## React-awesome-popover

[Demo](http://jsfiddle.net/6qogfdkr/359/embedded/result/)

![](https://res.cloudinary.com/dxv8p5zck/image/upload/v1510661171/ezgif.com-crop_vbxgdc.gif)

### Installation

---

**via NPM**

```code
npm i react-awesome-popover
```

**via Yarn**

```code
yarn add react-awesome-popover
```

**via CDN (unpkg)**

```code
https://unpkg.com/react-awesome-popover@latest/dest/react-awesome-popover.js
```

UMD library exposed as `ReactAwesomePopover`

```js
const Popover = ReactAwesomePopover;
```

Do not forget to use the stylesheet.

```js
import "react-awesome-popover/dest/react-awesome-popover.css";
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

### +With react-motion

Set the Motion property to True. Second child becomes a function, It returns the id, popperProps and Arrow.
You need to combine Popper style with motion style

```jsx
<Popover motion>
  <button>Click</button>
  {(popperProps, Arrow) => (
    <Motion defaultStyle={{ rotateY: 90 }} style={{ rotateY: spring(0) }}>
      {({ rotateY }) => {
        var motionStyle = {
          transform: `${popperProps.style.transform} rotateY(${rotateY}deg)`
        };
        return (
          <div
            {...popperProps}
            style={{ ...popperProps.style, ...motionStyle }}
          >
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
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      error laudantium incidunt vitae dignissimos praesentium nesciunt,
      <Popover action="hover" placement="top">
        <b>pariatur provident natus</b>
        <div>Wow man</div>
      </Popover>
      aperiam, corporis, quo libero sapiente recusandae! Distinctio deserunt
      dolor sequi, i
    </div>
  </Popover>,
  document.getElementById("app")
);
```

### Props

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>arrow</td>
    <td>Boolean</td>
    <td>If False, the arrow is removed</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>String</td>
    <td>The placement of the popover.<br/>Read more.The default value is auto</td>
  </tr>
  <tr>
    <td>targetClass</td>
    <td>String</td>
    <td>The name of the target class</td>
  </tr>
  <tr>
    <td>contentClass</td>
    <td>String</td>
    <td>The name of the content class</td>
  </tr>
  <tr>
    <td>arrowClass</td>
    <td>String</td>
    <td>The name of the arrow class</td>
  </tr>
  <tr>
    <td>action</td>
    <td>String</td>
    <td>click or hover.The default value is click</td>
  </tr>
  <tr>
    <td>defaultIsOpen</td>
    <td>Boolean</td>
    <td>Initial opened state when uncontrolled</td>
  </tr>
  <tr>
    <td>onOpen</td>
    <td>Function</td>
    <td>Callback invoked when the popover opens after it is added to the DOM.</td>
  </tr>
  <tr>
    <td>onClose</td>
    <td>Function</td>
    <td>Callback invoked when a popover begins to close.</td>
  </tr>
  <tr>
  <td>customArrow</td>
  <td>JSX</td>
  <td>Returns a custom arrow</td>
  </tr>
  <tr>
  <td>motion</td>
  <td>Boolean</td>
  <td>Allows react-motion</td>
  </tr>
  <tr>
    <td>modifiers</td>
    <td>Object</td>
    <td>Allow passing <a href="https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object">Popper modifiers</a> as props.</td>
  </tr>
  <tr>
    <td>open</td>
    <td>Boolean</td>
    <td>Whether the popover is visible. Passing this prop puts the popover in controlled mode.To make the popover completely manageable, you must pass the <code>null</code> value to the <code>action</code> prop</td>
  </tr>
  <tr>
    <td>touch</td>
    <td>Boolean</td>
    <td>The touch event will be triggered instead of the click event</td>
  </tr>
  <tr>
    <td>arrowFill</td>
    <td>String</td>
    <td>Fill color of the arrow</td>
  </tr>
</table>
