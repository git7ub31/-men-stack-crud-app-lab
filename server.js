const dotenv = require("dotenv"); //require package
dotenv.config(); //Loads the environment variables from .env file
const express = require('express');
const mongoose = require("mongoose"); //require package
const app = express();
const methodOverride = require("method-override"); 
const morgan = require("morgan");

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// // log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//importing the model 
const Planet = require("./models/planet.js");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan("dev"));

//landing route page
app.get("/", async (req,res) => {
    res.render("index.ejs");
});

//GET /planets to display data
app.get("/planets", async (req,res) => {
    const allPlanets = await Planet.find();
    res.render("planets/index.ejs", { planets: allPlanets});
});

//get /planets/new page
app.get("/planets/new", (req,res) => {
    res.render("planets/new.ejs");
});

//get /planets/:planetId to show each input
app.get("/planets/:planetId", async (req,res) => {
    const selectPlanet = await Planet.findById(req.params.planetId); 
    res.render("planets/show.ejs", { planet: selectPlanet});
});

//post /planets to mongoose
app.post("/planets", async (req,res) => {
    await Planet.create(req.body);
    res.redirect("/planets");
});

app.delete("/planets/:planetId", async (req,res) => {
    await Planet.findByIdAndDelete(req.params.planetId);
    res.redirect("/planets");
});

app.get("/planets/:planetId/edit", async (req,res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("fruits/edit.ejs", {
        planet: foundPlanet,
    });
});

//PUT /updating the planet
app.put("/planets/:planetId", async (req,res) => {
    await Planet.findByIdAndUpdate(req.params.planetId, req.body);
    res.redirect(`/planets/${req.params.planetId}`);
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});