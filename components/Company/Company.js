import { useContext, useEffect, useState } from "react";
import css from "./company.css";
import StateContext from "../../contexts/StateContext";

function Company({ company }) {
  const { selectedServices, selectedSizes } = useContext(StateContext);
  const [visible, setVisibility] = useState(true);

  const [name, url, size, expertise, twitter, linkedin] = company;
  const services = expertise
    .toLowerCase()
    .split(",")
    .map(item => item.trim())
    .sort();

  useEffect(() => {
    let companyMatchesServices = services.some(s =>
      selectedServices.includes(s)
    );

    let companyMatchesSizes = selectedSizes.includes(size);

    setVisibility(companyMatchesServices && companyMatchesSizes);
  }, [selectedServices, selectedSizes]);

  return (
    <article
      className={css.company}
      style={{ display: !visible ? "none" : null }}
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
          {services.map(service => (
            <span key={service} className={css.service}>
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className={css.social}>{twitter}</div>
    </article>
  );
}

export default Company;
