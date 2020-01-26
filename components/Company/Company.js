import css from "./company.css";

function Company({ company }) {
  const [name, url, size, expertise, twitter, linkedin] = company;
  const services = expertise.split(",");

  return (
    <article className={css.company}>
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
