import { useState } from "react";

import "../css/app.css";
import navigation from "../css/navigation.css";
import filter from "../css/filter.css";
import { SERVICES, SIZES } from "../lib/helpers";

import StateContext from "../contexts/StateContext";
import Checkbox from "../components/Checkbox";

function MyApp({ Component, pageProps }) {
  const [selectedServices, setSelectedServices] = useState([...SERVICES]);
  const [selectedSizes, setSelectedSizes] = useState([...SIZES]);

  return (
    <StateContext.Provider value={{ selectedServices, selectedSizes }}>
      <header>
        <h1 className={navigation.logo}>
          <a href="#about">Seattle Design</a>
        </h1>
      </header>

      <section className={filter.companies}>
        <form
          className={filter.form}
          onChange={event => {
            const exists = selectedServices.includes(event.target.value);

            if (exists) {
              setSelectedServices(
                selectedServices.filter(c => {
                  return c !== event.target.value;
                })
              );
            } else {
              setSelectedServices([...selectedServices, event.target.value]);
            }
          }}
        >
          <h6>Services</h6>
          {SERVICES.map((focus, index) => {
            return (
              <Checkbox
                key={`${focus}-${index}`}
                index={index}
                value={focus}
                name="services"
                checked={selectedServices.includes(focus)}
              />
            );
          })}
        </form>

        <form
          className={filter.form}
          onChange={() => {
            const exists = selectedSizes.includes(event.target.value);

            if (exists) {
              setSelectedSizes(
                selectedSizes.filter(c => {
                  return c !== event.target.value;
                })
              );
            } else {
              setSelectedSizes([...selectedSizes, event.target.value]);
            }
          }}
        >
          <h6>Size</h6>
          {SIZES.map((size, index) => (
            <Checkbox
              key={`${size}-${index}`}
              index={index}
              value={size}
              name="sizes"
              checked={selectedSizes.includes(size)}
            />
          ))}
        </form>
      </section>

      <Component {...pageProps} />
    </StateContext.Provider>
  );
}

export default MyApp;
