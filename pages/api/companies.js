import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Companies`,
      {
        params: {
          view: "Grid view",
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        },
      }
    );

    if (!response.statusText === "OK") {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = response.data;

    return res.json({
      statusCode: 200,
      companies: data.records,
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
