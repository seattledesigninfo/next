import axios from "axios";

const airtable = axios.create({
  baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}`,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
  },
});

export { airtable };
