import Link from "next/link";
import { useState, useEffect } from "react";
import css from "./company.css";

import { slugify } from "../../lib/helpers";

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
          <Link
            href="/company/[...slug]"
            as={`/company/${slugify(name)}/${company.id}`}
          >
            <a>{name}</a>
          </Link>
          {/* <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a> */}
        </h1>
      </header>

      <div className={css.meta}>
        <div className={css.services}>
          <h2>Services</h2>
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
                  style={{ fontWeight: isVisible ? "bold" : "normal" }}
                >
                  {s.name}
                </span>
              );
            })}
        </div>

        <div>
          <h2>Size</h2>
          {size}
          <br />
        </div>
      </div>

      <div className={css.social}>
        <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
      </div>
    </article>
  );
}

export default Company;
