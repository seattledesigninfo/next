const Checkbox = ({ index, value, name, ...others }) => {
  let { checked } = others;

  return (
    <label
      className={`checkbox rounded cursor-pointer inline-block mr-xs mb-xs py-xs px-sm focus-within:bg-gray-dark ${
        checked ? "bg-brand text-white" : "bg-gray-light text-gray-dark"
      }`}
      key={value}
      htmlFor={`${name}-${index}`}
    >
      <input
        tabIndex={0}
        name={name}
        className="sr-only"
        type="checkbox"
        id={`${name}-${index}`}
        value={value}
        checked={checked}
        {...others}
      />
      <span className="company-service">{value}</span>
    </label>
  );
};

export default Checkbox;
