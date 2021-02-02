import Link from "next/link";
import { useState, useEffect } from "react";
import DateDiff from "date-diff";

import { slugify } from "../../lib/helpers";

import {
  useServicesDispatch,
  useServicesState,
} from "../../contexts/ServicesContext";
import { Twitter, Linkedin } from "../../components/Icon";

function Company({ company, appState }) {
  const { status, services: allServices } = useServicesState();
  const [isVisible, setVisible] = useState(true);
  const [updatedRecently, setUpdatedRecently] = useState(false);
  const dispatch = useServicesDispatch();

  const {
    name,
    size,
    services,
    last_update,
    twitter,
    linkedin,
  } = company.fields;

  useEffect(() => {
    if (status !== "initialized") {
      setVisible(
        appState.sizes.includes(size) &&
          appState.services.every((e) => services.includes(e.id))
      );
    }
  }, [status, services, appState.services, appState.sizes]);

  useEffect(() => {
    let today = new Date();
    let lastChecked = new Date(last_update);

    if (new DateDiff(today, lastChecked).days() < 7) {
      setUpdatedRecently(true);
    }
  }, [last_update, updatedRecently]);

  return (
    <article
      className={`rounded-md overflow-hidden p-sm flex flex-col border-solid border-gray-light border-4 ${
        !isVisible ? "hidden" : ""
      }`}
    >
      <Link
        href="/company/[...slug]"
        as={`/company/${slugify(name)}/${company.id}`}
      >
        <a>
          <header className="mb-md">
            <h1 className="font-display text-lg">{name}</h1>
          </header>
        </a>
      </Link>

      <div className="mb-lg flex-grow">
        <h2 className="uppercase tracking-widest text-gray-dark text-sm mb-xs">
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
                  className={`service ${isVisible ? "bg-highlight" : ""}`}
                >
                  {s.name}
                </span>
              );
            })
            .reduce((prev, curr) => [prev, ", ", curr])}
      </div>

      <div className="mb-lg flex-grow">
        <h2 className="uppercase tracking-widest text-gray-dark text-sm mb-xs">
          Size
        </h2>
        {size}
      </div>

      <div className="-ml-xs flex">
        {twitter && (
          <a
            rel="noreferrer noopener"
            className="text-gray-dark hover:text-link-hover p-xs"
            href={twitter}
          >
            <Twitter height="16" width="16" />
          </a>
        )}
        {linkedin && (
          <a
            rel="noreferrer noopener"
            className="text-gray-dark hover:text-link-hover p-xs"
            href={linkedin}
          >
            <Linkedin height="16" width="16" />
          </a>
        )}
      </div>

      {updatedRecently && (
        <div className="uppercase text-xs inline-block -mx-sm -mb-sm p-sm mt-md bg-gray-light text-brand">
          Website updated recently
        </div>
      )}
    </article>
  );
}

export default Company;
