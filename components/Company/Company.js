import { useState, useCallback } from "react";
import css from "./company.css";

import { useState as useSizes } from "../../contexts/SizeContext";
import { useState as useServices } from "../../contexts/ServicesContext";
import { useMemo, useEffect } from "react";

function compareServices(selectedServices, services) {
  return Object.entries(selectedServices)
    .filter(([id, values]) => values.selected)
    .some(([id, values]) => services.includes(id));
}

function Company({ company }) {
  const { status, services: selectedServices } = useServices();
  const selectedSizes = useSizes();
  const [isVisible, setVisible] = useState(true);

  const { name, url, size, services, twitter, linkedin } = company.fields;

  let companyMatchesServices = useMemo(
    () => compareServices(selectedServices, services),
    [selectedServices, services]
  );

  let companyMatchesSizes = useMemo(() => selectedSizes.includes(size), [
    selectedSizes,
    size,
  ]);

  useEffect(() => {
    if (status !== "initialized") {
      setVisible(companyMatchesServices && companyMatchesSizes);
    }
  }, [status, companyMatchesServices, companyMatchesSizes]);

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
              return (
                <span key={service} className={css.service}>
                  {selectedServices[service]["name"]}
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
