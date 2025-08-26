import { useState } from "react";
import { RootState } from "../store";
import { increment } from "../store/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Counter = () => {
  const [number, setNumber] = useState("");
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state: RootState) => state.counter.value);

  const handleClick = () => {
    dispatch(increment(+number));
    setNumber("");
  };
  return (
    <div className="container-input">
      <h2>Redux counter state:</h2>
      {counter}
      <div className="wrapper-input">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleClick}>submit</button>
      </div>
    </div>
  );
};

export default Counter;
