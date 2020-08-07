import css from "./company.css";

import { useState as useSizes } from "../../contexts/SizeContext";
import { useState as useServices } from "../../contexts/ServicesContext";

let companyMatchesServices = (selected, companiesServices) =>
  Object.entries(selected)
    .filter(([id, values]) => values.selected)
    .some(([id, values]) => companiesServices.includes(id));

let companyMatchesSizes = (selectedSizes, size) => selectedSizes.includes(size);

function Company({ company }) {
  const { status, services: selectedServices } = useServices();
  const selectedSizes = useSizes();

  const { name, url, size, services, twitter, linkedin } = company.fields;

  const visible = () => {
    return (
      companyMatchesServices(selectedServices, services) &&
      companyMatchesSizes(selectedSizes, size)
    );
  };

  return (
    <article
      className={css.company}
      style={{ display: !visible() ? "none" : null }}
    >
      <header className={css.header}>
        <h1 className={css.name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h1>
        <div className={css.size}>{size}</div>
      </header>

      {status === "done" ? (
        <div className={css.meta}>
          <div className={css.services}>
            <h6>Services</h6>
            {services.map((service) => {
              return (
                <span key={service} className={css.service}>
                  {selectedServices[service]["name"]}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={css.social}>{twitter}</div>
    </article>
  );
}

export default Company;
