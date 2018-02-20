import React from "react";
import ReactDOM from "react-dom";
import Popover from "./Popover";

ReactDOM.render(
  <Popover index={1000} placement="left">
    <button>Hello worldllllllllllllll..........</button>
    <div>
      <p>Hello world.......................................</p>
      <Popover index={1010}>
        <button>Click</button>
        <div>Popover content</div>
      </Popover>
    </div>
  </Popover>,
  document.getElementById("app")
);
