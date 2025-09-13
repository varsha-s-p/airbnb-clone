
const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      filename: {
        type: String,
        default: "listingImage",
      },
      url: {
        type: String,
        default: "https://unsplash.com/photos/riding-a-bmx-bike-through-a-sunlit-forest-At7_9PyVkh4",
        set: (v) =>
          v === ""
            ? "https://unsplash.com/photos/riding-a-bmx-bike-through-a-sunlit-forest-At7_9PyVkh4"
            : v,
      },
    },
    price: Number,
    locations: String,
    country: String,
  });

// export the db to app.js
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


















// <!DOCTYPE html>
//  <html lang="en">
//  <head>
//      <meta charset="UTF-8">
//      <meta name="viewport" content="width=device-width, initial-scale=1.0">
//      <title>wanderlast</title>

//  </head>
//  <body>
//      <h1>all listings</h1>
//      <!-- <ul>
//      <% for(let listings of allListings) { %>
//         <li><%= listings.title %></li>
//      <% } %>
//     </ul> -->


//     <!-- <ul>
//         for(let listings of allListings) { %>
//            <li> <a href="/listings/<%= listings._id %>"> <%= listings.title %></a></li>
//         <% } %>
//        </ul> -->

     
//  </body>
//  </html>


