const Listing = require("../models/listing");

module.exports.category = async (req, res) => {
  let option = req.params.cat;

  const categoriesInDB = await Listing.distinct("category");

  const allListings = await Listing.find({
    category: { $regex: new RegExp(`^${option}$`, "i") },
  });

  res.render("listings/index.ejs", { allListings });
};
