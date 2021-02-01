const axios = require("axios");

exports.faunaFetch = async ({ query, variables }) => {
  return await axios
    .post("https://graphql.fauna.com/graphql", {
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
      },
      data: JSON.stringify({
        query,
        variables,
      }),
    })
    .then((res) => res)
    .catch((err) => console.error(JSON.stringify(err, null, 2)));
};
