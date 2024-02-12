const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// console.log(process.env.TRACKER_API_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    withCredentials: false,
    methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  let data = "";

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.TRACKER_API_URL,
    headers: {},
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(response.data);
      //   console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/vehicle/:vehicleId", (req, res) => {
  const vehicleId = req.params.vehicleId;
  const vehicleUrl = `${process.env.TRACKER_API_URL}&vehicle_id=${vehicleId}`;

  const vehicleConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: vehicleUrl,
    headers: {},
  };

  axios
    .request(vehicleConfig)
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.error("Error fetching vehicle data:", error);
      res.status(500).json({ error: "Failed to fetch vehicle data" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
