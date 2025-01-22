// I made buttons for other buttons including (+/-) 1, 2, 3, and 5.

import { useState } from "react";
import "./App.css";

function App() {
  // Initialize state
  const [count, setCount] = useState(0);

  return <>
    {/* Header and count */}
    <h1>Tom's Counter Application</h1>
    <p className="count">Count: {count}</p>

    {/* Decrement/Minus Buttons */}
    <button className="dec" onClick={()=>{setCount(count - 5)}}>-5</button>
    <button className="dec" onClick={()=>{setCount(count - 3)}}>-3</button>
    <button className="dec" onClick={()=>{setCount(count - 2)}}>-2</button>
    <button className="dec" onClick={()=>{setCount(count - 1)}}>Decrement</button>

    {/* Anything multiplied by 0 is 0 */}
    <button className="clear" onClick={()=>{setCount(count * 0)}}>Clear</button>

    {/* Increment/Plus Buttons */}
    <button className="inc" onClick={()=>{setCount(count + 1)}}>Increment</button>
    <button className="inc" onClick={()=>{setCount(count + 2)}}>+2</button>
    <button className="inc" onClick={()=>{setCount(count + 3)}}>+3</button>
    <button className="inc" onClick={()=>{setCount(count + 5)}}>+5</button>
  </>;
}

export default App;
