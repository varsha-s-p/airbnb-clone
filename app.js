// to install basic setup from....
// this is basic install before starting the process
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const Listing = require("../apna_project/modules/listing");
const Listing = require("./modules/listing");
// to set up index we have require
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js");
const { data: sampleListings } = require("./sample");


// this is normal api
app.get("/",(req, res) => {
    res.send("this is varsha working on it");
});

// connect to database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(() =>{
    console.log("conneccted to db");  
})
.catch((err) =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

// new roter to get checked if its working and setting basic url
// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My home",
//         description: "near by the beach",
//         price: 2000,
//         locations: "udupi",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("successful tested");
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


//index route
app.get("/listings", wrapAsync(async (req,res) => {
    const allListings = await Listing.find({});
    res.render('listings/index',{allListings});
}));

//create route
app.get("/listings/new", async(req,res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing});
}));

app.get("/seed", async (req, res) => {
  try {
    // Delete old data (optional, to avoid duplicates)
    await Listing.deleteMany({});

    // Insert new sample data
    await Listing.insertMany(sampleListings);

    res.send("Database seeded successfully!");
  } catch (e) {
    console.log(e);
    res.send("Error seeding database.");
  }
});


// //post create route

app.post("/listings" , wrapAsync(async(req,res,next) => {
    if(!req.body.listings){
        throw new ExpressError(400, "send valid data for listing");
    }
    const newListing = new Listing(req.body.listings);
    if(!newListing.title) {
        throw new ExpressError(400, "title is missing");
    } 
    if(!newListing.description) {
        throw new ExpressError(400, "description is missing");
    }  
    if(!newListing.locations) {
        throw new ExpressError(400, "location is missing");
    }           

    await newListing.save();
    res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
}));


// update route
app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listings });
    res.redirect("/listings");
}));

//delete route
app.delete("/listings/:id", wrapAsync(async(req, res) => {
      let { id } = req.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
      console.log(deletedListing);
      res.redirect("/listings");
}));

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).render("error.ejs" ,{message});
    //res.status(statusCode).send(message);

})



// this portion is used for starting the server
app.listen(8080, () => {
    console.log("server is listeing to port 8080");
});
// to...

