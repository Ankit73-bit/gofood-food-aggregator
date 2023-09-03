const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Serving staticfiles
app.use(express.static(`${__dirname}/public/`));

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.use(express.json());
app.use("/api", require("./Routes/userRoutes"));
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/orderRoutes"));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

module.exports = app;
