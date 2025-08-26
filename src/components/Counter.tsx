import { useState } from "react";
import { RootState } from "../store";
import { increment } from "../store/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Box } from "@mui/material";

const Counter = () => {
  const [number, setNumber] = useState("");
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state: RootState) => state.counter.value);

  const handleClick = () => {
    dispatch(increment(+number));
    setNumber("");
  };
  return (
    <Box className="pb-8 border-t-2 pt-4 border-white">
      <h2>Redux counter state :</h2>
      {counter}
      <Box className="pt-8">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </Box>
      <Box>
        <button onClick={handleClick}>submit</button>
      </Box>
    </Box>
  );
};

export default Counter;
