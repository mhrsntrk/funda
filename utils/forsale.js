const { gotScraping } = require("got-scraping");
const { MongoClient } = require("mongodb");
const cheerio = require("cheerio");
require("dotenv").config();

const notion = require("./notion");

async function forsale(
  listingType,
  searchLocation,
  propertyType,
  priceMin,
  priceMax,
  minLivingArea,
  minBedroom
) {
  const mongoURI = process.env.MONGO_URI;
  const client = new MongoClient(mongoURI);
  var totalResult = 0;
  try {
    await client.connect();
    await gotScraping
      .get({
        url: `https://www.funda.nl/en/${listingType}/${searchLocation}/${priceMin}-${priceMax}/${minLivingArea}+woonopp/${propertyType}/${minBedroom}+slaapkamers/`,
        headerGeneratorOptions: {
          browsers: [
            {
              name: "chrome",
              minVersion: 87,
            },
            {
              name: "firefox",
              minVersion: 80,
            },
            "safari",
          ],
          devices: ["desktop", "mobile"],
          locales: ["en-US"],
          operatingSystems: ["windows", "macos", "linux"],
        },
        http2: true,
        headers: {
          accept: "text/html",
        },
      })
      .then(({ body }) => {
        const $ = cheerio.load(body);
        const totalResultStr = $(".search-output-result-count")
          .find("span")
          .text()
          .match(/\d+/)[0];
        totalResult = parseInt(totalResultStr);
      });
    console.log(totalResult);
    for (let i = 1; i < totalResult / 15; i++) {
      await gotScraping
        .get({
          url: `https://www.funda.nl/en/${listingType}/${searchLocation}/${priceMin}-${priceMax}/${minLivingArea}+woonopp/${propertyType}/${minBedroom}+slaapkamers/p${i}`,
          headerGeneratorOptions: {
            browsers: [
              {
                name: "chrome",
                minVersion: 87,
              },
              {
                name: "firefox",
                minVersion: 80,
              },
              "safari",
            ],
            devices: ["desktop", "mobile"],
            locales: ["en-US"],
            operatingSystems: ["windows", "macos", "linux"],
          },
          http2: true,
          headers: {
            accept: "text/html",
          },
        })
        .then(({ body }) => {
          const $ = cheerio.load(body);
          const result = $(".search-result");
          result.each(async (idx, el) => {
            var uuid = $(el).attr("data-global-id");
            var name = $(el).find(".search-result__header-title").text().trim();
            var location = $(el)
              .find(".search-result__header-subtitle")
              .text()
              .trim();
            var price = $(el).find(".search-result-price").text().trim();
            var livingArea = $(el)
              .find(".search-result-info")
              .find("li")
              .find("> :nth-child(1)")
              .text()
              .trim();
            var plotArea = $(el)
              .find(".search-result-info")
              .find("li")
              .find("> :nth-child(2)")
              .text()
              .trim();
            var rooms = $(el)
              .find(".search-result-info")
              .find("ul")
              .find("> :nth-child(2)")
              .text()
              .trim();
            var makelaar = $(el)
              .find(".search-result-makelaar-name")
              .text()
              .trim();
            var status = $(el).find(".label").text().trim();
            var url = `https://funda.nl${$(el)
              .find(".search-result__header-title-col")
              .find("a")
              .attr("href")}`;

            var isExists = await documentExists(client, uuid);

            if (isExists) {
              //update mongoDB entry
              await upsertPropertyForSale(client, uuid, {
                _id: uuid,
                name: name,
                location: location,
                price: price,
                livingArea: livingArea,
                plotArea: plotArea,
                rooms: rooms,
                makelaar: makelaar,
                status: status,
                url: url,
              });
              // get Notion ID of the mongoDB entry.
              var find = await findProperty(client, uuid);
              var notionID = find.notionID;
              // update Notion entry
              await notion.update(
                (notionID = notionID),
                (uuid = uuid),
                (name = name),
                (location = location),
                (price = price),
                (livingArea = livingArea),
                (plotArea = plotArea),
                (rooms = rooms),
                (makelaar = makelaar),
                (status = status),
                (url = url)
              );
            } else {
              //create mongoDB entry
              await upsertPropertyForSale(client, uuid, {
                _id: uuid,
                name: name,
                location: location,
                price: price,
                livingArea: livingArea,
                plotArea: plotArea,
                rooms: rooms,
                makelaar: makelaar,
                status: status,
                url: url,
              });
              // create Notion entry
              var notionID = await notion.createSale(
                (uuid = uuid),
                (name = name),
                (location = location),
                (price = price),
                (livingArea = livingArea),
                (plotArea = plotArea),
                (rooms = rooms),
                (makelaar = makelaar),
                (status = status),
                (url = url)
              );
              // add NotionID to mongoDB
              await upsertPropertyForSale(client, uuid, {
                notionID: notionID,
              });
            }
          });
        });
    }
  } catch (err) {
    console.error(err);
  }
}

async function upsertPropertyForSale(client, uuid, property) {
  const result = await client
    .db("funda")
    .collection("forsale")
    .updateOne({ _id: uuid }, { $set: property }, { upsert: true });
  if (result.upsertedCount > 0) {
    console.log(
      `A new property created with the following id: ${result.upsertedId}`
    );
  }
}

async function findProperty(client, uuid) {
  return await client.db("funda").collection("forsale").findOne({ _id: uuid });
}

async function documentExists(client, uuid) {
  return (
    (await client
      .db("funda")
      .collection("forsale")
      .find({ _id: uuid })
      .count()) > 0
  );
}

module.exports = forsale;
