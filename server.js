const axios = require("axios");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/detail", (req, res) => {
  res.send("detail");
});

const makeApiRequest = async () => {
  try {
    const response = await axios.get("http://localhost:5000/detail");
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

const executeApiNtimes = async (n) => {
  const requests = Array.from({ length: n }, () => makeApiRequest());
  const responses = await Promise.all(requests);
  return responses;
};

const runSetOfAPIsMtimes = async (m, n) => {
  const apiSets = Array.from({ length: m }, () => executeApiNtimes(n));
  const results = await Promise.all(apiSets);
  return results;
};

const m = 5;
const n = 3;
const p = 4;

runSetOfAPIsMtimes(m, n)
  .then((result) => {
    console.log("All API sets completed:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
