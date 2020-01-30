import axios from "axios";
const url = process.env.SHEETS_URL;

export default async (req, res) => {
  const request = await axios.get(url);

  res.json({
    companies: request.data.values
  });
};
