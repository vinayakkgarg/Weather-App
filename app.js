const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //   console.log("post received");
  //   console.log(req.body.cityName);

  const query = req.body.cityName;
  const api_key = "_";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    api_key;

  https.get(url, function (response) {
    // console.log(response);
    console.log(response.statusCode);

    response.on("data", function (data) {
      // console.log(data);
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      const temp = weatherData.main.temp;
      // console.log(temp);

      const weatherDescription = weatherData.weather[0].description;
      // console.log(weatherDescription);

      const icon = weatherData.weather[0].icon;
      const img_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius</h1>"
      );
      res.write("<img src=" + img_url + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on 3000");
});
