import Link from "next/link";
import { useState, useEffect } from "react";
// import css from "./company.css";

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
      className={`rounded-md overflow-hidden p-sm flex flex-col border-solid border-gray-light border-4 ${
        !isVisible ? "hidden" : ""
      }`}
    >
      <header className="mb-md">
        <h1 className="font-display text-lg">
          <Link
            href="/company/[...slug]"
            as={`/company/${slugify(name)}/${company.id}`}
          >
            <a>{name}</a>
          </Link>
        </h1>
      </header>

      <div className="mb-md flex-grow">
        <h2 className="uppercase tracking-widest text-gray-dark text-xs mb-sm">
          Services
        </h2>
        {status === "done" &&
          services
            .map((service) => {
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
                  className={`service text-sm ${
                    isVisible ? "bg-highlight" : ""
                  }`}
                >
                  {s.name}
                </span>
              );
            })
            .reduce((prev, curr) => [prev, ", ", curr])}
      </div>

      <div className="mb-md flex-grow">
        <h2 className="uppercase tracking-widest text-gray-dark text-xs mb-sm">
          Size
        </h2>
        {size}
      </div>

      {twitter && <a href={`https://twitter.com/${twitter}`}>{twitter}</a>}
    </article>
  );
}

export default Company;
