import { setup } from "axios-cache-adapter";

const api = setup({
  baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}`,
  cache: { maxAge: 15 * 60 * 1000, exclude: { query: false } },
});

export default async (req, res) => {
  try {
    const response = await api.get("/Services", {
      params: {
        view: "Grid view",
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
    });

    if (!response.statusText === "OK") {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = response.data.records.reduce((acc, current) => {
      return [...acc, { id: current.id, name: current.fields["Name"] }];
    }, []);

    return res.json({
      statusCode: 200,
      services: data,
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
