import {
  useServicesState,
  useServicesDispatch,
} from "../../contexts/ServicesContext";

import Checkbox from "../Checkbox";

const Services = () => {
  const { status, services, active } = useServicesState();
  const dispatch = useServicesDispatch();

  if (status !== "done") {
    return <div>Loading…</div>;
  }

  return (
    <form>
      <h2>Services</h2>
      {services.map((service, index) => {
        const dispatchType = active.some((s) => s.id === service.id)
          ? "DESELECT"
          : "SELECT";

        return (
          <Checkbox
            onChange={() => {
              dispatch({
                type: dispatchType,
                payload: service,
              });
            }}
            key={service.id}
            index={index}
            value={service.name}
            name="services"
            checked={active.some((s) => s.id === service.id)}
          />
        );
      })}
    </form>
  );
};

export default Services;
