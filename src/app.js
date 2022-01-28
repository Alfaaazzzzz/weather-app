const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port= process.env.PORT || 3000

// Define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views"); // customized directory path
const partialPath = path.join(__dirname, "../template/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDir)); //it is a way to customize server

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Alfaz",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Alfaz",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "We are here to help you, you can contact us at help@alfaz.io",
    title: "Help",
    name: "Alfaz",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a valid location!!",
    });
  }
  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          address: req.query.address,
          location,
          forecast: forecastData,
        });
      });
    } 
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    name: "Alfaz",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404",
    name: "Alfaz",
  });
});

app.listen(port, () => {
  console.log("Server running on port "+port);
});
