import { useReducer, useContext, createContext } from "react";

const sizes = ["1-10", "11-50", "51-200", "201-500", "501+"];

const SizeContext = createContext();
const SizeDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return {
        sizes: state.sizes,
        active: [...state.active, action.payload],
      };
    case "DESELECT":
      return {
        sizes: state.sizes,
        active: state.active.filter((c) => c !== action.payload),
      };
    default:
      return;
  }
};

export const SizeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    sizes: sizes,
    active: sizes,
  });

  return (
    <SizeContext.Provider value={state}>
      <SizeDispatch.Provider value={dispatch}>{children}</SizeDispatch.Provider>
    </SizeContext.Provider>
  );
};

export const useSizeState = () => useContext(SizeContext);
export const useSizeDispatch = () => useContext(SizeDispatch);
