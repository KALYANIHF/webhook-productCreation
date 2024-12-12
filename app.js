const express = require("express");
const app = express();
const crypto = require("crypto");
const fs = require("fs");
const dotenv = require("dotenv");
const port = 4000;
const randomkey = crypto.randomBytes(4).toString("hex");
const SHOPIFY_API_KEY = process.env.SHOPIFY_SECRET_KEY;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/webhook", (req, res) => {
  const productData = req.body;
  console.log("Received webhook:", productData);
  console.log(productData);
  fs.writeFileSync(
    `./ProductJSON/productData-${randomkey}.json`,
    JSON.stringify(req.body),
    {
      encoding: "utf8",
      flag: "w",
    }
  );
  res.status(200).send("Webhook received");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
