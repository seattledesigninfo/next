import { useState, useEffect } from "react";
import css from "./company.css";

import {
  useServicesDispatch,
  useServicesState,
} from "../../contexts/ServicesContext";

function Company({ company, appState }) {
  const { status, services: allServices } = useServicesState();
  const [isVisible, setVisible] = useState(true);
  const dispatch = useServicesDispatch();

  const { name, url, size, services, twitter, linkedin } = company.fields;

  useEffect(() => {
    if (status !== "initialized") {
      setVisible(
        appState.sizes.includes(size) &&
          appState.services.every((e) => services.includes(e.id))
      );
    }
  }, [status, services, appState.services, appState.sizes]);

  return (
    <article
      className={css.company}
      style={{ display: !isVisible ? "none" : null }}
    >
      <header className={css.header}>
        <h1 className={css.name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h1>
        <div className={css.size}>{size}</div>
      </header>

      <div className={css.meta}>
        <div className={css.services}>
          <h6>Services</h6>
          {status === "done" &&
            services.map((service) => {
              const s = allServices.find((s) => s.id === service);
              const isVisible = appState.services.some((s) => s.id === service);
              const dispatchType = isVisible ? "DESELECT" : "SELECT";

              return (
                <span
                  onClick={() => {
                    dispatch({
                      type: dispatchType,
                      payload: {
                        id: service,
                        name: s.name,
                      },
                    });
                  }}
                  key={service}
                  className={css.service}
                >
                  {s.name}
                </span>
              );
            })}
        </div>
      </div>

      <div className={css.social}>{twitter}</div>
    </article>
  );
}

export default Company;
