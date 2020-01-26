import axios from "axios";

export default async (req, res) => {
  const request = await axios.get(
    "https://sheets.googleapis.com/v4/spreadsheets/1rk4fXDdExTtsQADUjYQ1jliagqatlZ4l99BUmFOZzeA/values/companies!A2:F?key=AIzaSyDqq0Ts0HE75f8ZYG20SSilYAi-xOk8JIQ"
  );

  res.json({
    companies: request.data.values
  });
};
