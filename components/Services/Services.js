import { useState, useDispatch } from "../../contexts/ServicesContext";

import Checkbox from "../Checkbox";

const Services = () => {
  const { status, services } = useState();
  const dispatch = useDispatch();

  return (
    <form>
      <h6>Services</h6>
      {Object.keys(services).map((service, index) => {
        const dispatchType = services[service]["selected"]
          ? "DESELECT"
          : "SELECT";

        return (
          <Checkbox
            onChange={() => {
              dispatch({
                type: dispatchType,
                payload: { id: service, name: services[service]["name"] },
              });
            }}
            key={`${service}-${index}`}
            index={index}
            value={services[service]["name"]}
            name="services"
            checked={services[service]["selected"]}
          />
        );
      })}
    </form>
  );
};

export default Services;
