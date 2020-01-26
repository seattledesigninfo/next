function Company({ company }) {
  const [name, url, size, expertise, twitter, linkedin] = company;

  return (
    <div>
      {[name, url, size, expertise, twitter, linkedin]
        .filter(Boolean)
        .join(",")}
    </div>
  );
}

export default Company;
