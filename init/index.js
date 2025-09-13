const mongoose = require("mongoose");
const initData = require('./data.js');
const Listing = require("../modules/listing.js");

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

const initDB = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is initizated");
}
initDB();



// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>wanderlast</title>
// </head>
// <body>
//     <h1>all listings</h1>
// </body>
// </html>













































