const express = require("express");
const cors = require("cors");
const Amadeus = require("amadeus");
var http = require("http").createServer(app);
var app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const amadeus = new Amadeus({
    clientId: process.env.REACT_APP_API_KEY,
    clientSecret: process.env.REACT_APP_API_SECRET
})

app.post("/date", async function (req, res) {
    console.log(req.body);
    departure = req.body.departure;
    locationDeparture = req.body.locationDeparture;
    locationArrival = req.body.locationArrival;
    const response = await amadeus.shopping.flightOffersSearch
        .get({
            originLocationCode: locationDeparture,
            destinationLocationCode: locationArrival,
            departureDate: departure,
            adults: "1",
        })
        .catch((err) => console.log(err));
    try {
        console.log(response.body)
        await res.json(JSON.parse(response.body));
    } catch (err) {
        await res.json(err);
    }
});

var server = app.listen(process.env.PORT || 2800, () => {
    console.log("Howdy, I am running at PORT 2800")
})