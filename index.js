const cron = require("node-cron");

const forrent = require ("./utils/forrent");
const forsale = require ("./utils/forsale");

/*
listingType: huur or koop
propertyType: appartement or woonhuis
searchLocation = den-haag,voorburg, etc.
*/

console.log (`Application started at ${new Date()}`);

//Runs at every hour minute 1 (i.e. 11:01)
cron.schedule("1 * * * *", function() {
    console.log("Pulling the properties for rent and updating the DB...");
    forrent(
        (listingType = "huur"),
        (searchLocation = "den-haag,voorburg,leidschendam"),
        (priceMin = "0"),
        (priceMax = "2000"),
        (minLivingArea = "100"),
        (minBedroom = "3")
      );
});

//Runs at every hour minute 3 (i.e. 11:03)
cron.schedule("3 * * * *", function() {
    console.log("Pulling the properties for sale and updating the DB...");
    forsale(
        (listingType = "koop"),
        (searchLocation = "den-haag,voorburg,leidschendam"),
        (propertyType = "woonhuis"),
        (priceMin = "0"),
        (priceMax = "800000"),
        (minLivingArea = "100"),
        (minBedroom = "3")
      );
});


/* forrent(
  (listingType = "huur"),
  (searchLocation = "den-haag,voorburg,leidschendam"),
  (priceMin = "0"),
  (priceMax = "2000"),
  (minLivingArea = "100"),
  (minBedroom = "3")
); */
/* forsale(
  (listingType = "koop"),
  (searchLocation = "den-haag,voorburg,leidschendam"),
  (propertyType = "woonhuis"),
  (priceMin = "0"),
  (priceMax = "800000"),
  (minLivingArea = "100"),
  (minBedroom = "3")
); */