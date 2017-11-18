## React-awesome-popover

[Demo](https://jsfiddle.net/vaheqelyan/6qogfdkr/8/show/light/)

![](https://res.cloudinary.com/dxv8p5zck/image/upload/v1510661171/ezgif.com-crop_vbxgdc.gif)

### Installation
* * *
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
https://unpkg.com/react-awesome-popover@1.3.2/dest/react-awesome-popover.js
```

UMD library exposed as `ReactAwesomePopover`

```js
const Popover = ReactAwesomePopover;
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

### +With react-motion
Set the Motion property to True. Second child becomes a function, It returns the id, popperProps and Arrow.
You need to combine Popper style with motion style

```jsx
<Popover motion>
  <button>Click</button>
  {(id, popperProps, Arrow) => (
    <Motion defaultStyle={{ rotateY: 90 }} style={{ rotateY: spring(0) }}>
      {({ rotateY }) => {
        var motionStyle = {
          transform: `${popperProps.style.transform} rotateY(${rotateY}deg)`
        };
        return (
          <div
            {...popperProps}
            {...id}
            style={{ ...popperProps.style, ...motionStyle }}
          >
            <h1>React-motion!</h1>
            {Arrow}
          </div>
        );
      }}
    </Motion>
  )}
</Popover>;

```

### Props
* *  * 

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
    <td>className</td>
    <td>String</td>
    <td>The className of the popover</td>
  </tr>
  <tr>
    <td>action</td>
    <td>String</td>
    <td>click or hover.The default value is click</td>
  </tr>
  <tr>
    <td>isOpen</td>
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
</table>