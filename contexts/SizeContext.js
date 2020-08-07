import { SIZES } from "../lib/helpers";
import { useReducer, useContext, createContext } from "react";

const SizeContext = createContext();
const SizeDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return [...state, action.payload];
    case "DESELECT":
      return state.filter((c) => c !== action.payload);
    default:
      return;
  }
};

export const SizeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, SIZES);

  return (
    <SizeDispatch.Provider value={dispatch}>
      <SizeContext.Provider value={state}>{children}</SizeContext.Provider>
    </SizeDispatch.Provider>
  );
};

export const useState = () => useContext(SizeContext);
export const useDispatch = () => useContext(SizeDispatch);
