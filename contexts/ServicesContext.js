import { useReducer, useContext, createContext, useEffect } from "react";
import axios from "axios";

const ServicesContext = createContext();
const ServicesDispatch = createContext();

const getData = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SELF_HOSTNAME}/api/services`
    );

    dispatch({
      type: "SET",
      payload: response.data.services,
    });
  } catch (error) {
    throw error;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return {
        status: "done",
        services: {
          ...state.services,
          [action.payload.id]: { name: action.payload.name, selected: true },
        },
      };
    case "DESELECT":
      return {
        status: "done",
        services: {
          ...state.services,
          [action.payload.id]: { name: action.payload.name, selected: false },
        },
      };
    case "SET":
      return {
        status: "done",
        services: action.payload,
      };
    default:
      return;
  }
};

export const ServicesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    status: "initialized",
    services: {},
  });

  useEffect(() => {
    if (state.status === "initialized") {
      getData(dispatch);
    }
  }, [state.status]);

  return (
    <ServicesDispatch.Provider value={dispatch}>
      <ServicesContext.Provider value={state}>
        {children}
      </ServicesContext.Provider>
    </ServicesDispatch.Provider>
  );
};

export const useState = () => useContext(ServicesContext);
export const useDispatch = () => useContext(ServicesDispatch);
