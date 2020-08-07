import css from "../../css/filter.css";

const Checkbox = ({ index, value, name, ...others }) => {
  let { checked } = others;

  return (
    <div className={css.checkbox} data-id={name[value]}>
      <input
        tabIndex={0}
        name={name}
        className={css.sr}
        type="checkbox"
        id={`${name}-${index}`}
        value={value}
        checked={checked}
        {...others}
      />
      <label
        htmlFor={`${name}-${index}`}
        className={checked ? css["checked--true"] : css["checked--false"]}
        key={value}
      >
        <span className="company-service">{value}</span>
      </label>
    </div>
  );
};

export default Checkbox;
