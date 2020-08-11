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
        services: state.services,
        active: [...state.active, action.payload],
      };
    case "DESELECT":
      return {
        status: "done",
        services: state.services,
        active: state.active.filter((c) => c.id !== action.payload.id),
      };
    case "SET":
      return {
        status: "done",
        services: action.payload,
        active: [],
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const ServicesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    status: "initialized",
    services: [],
    active: [],
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

function useServicesState() {
  const context = useContext(ServicesContext);

  if (context === undefined) {
    throw new Error("useServicesState must be used within a ServicesProvider");
  }

  return context;
}

function useServicesDispatch() {
  const context = useContext(ServicesDispatch);

  if (context === undefined) {
    throw new Error(
      "useServicesDispatch must be used within a ServicesProvider"
    );
  }

  return context;
}

export { ServicesProvider, useServicesState, useServicesDispatch };
