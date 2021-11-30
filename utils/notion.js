const { Client } = require("@notionhq/client");
const res = require("express/lib/response");
require("dotenv").config();

async function createRent(
  uuid,
  name,
  location,
  price,
  livingArea,
  plotArea,
  rooms,
  makelaar,
  status,
  url
) {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const database = process.env.NOTION_RENT_DATABASE_ID;
  try {
    const response = await notion.pages.create({
      parent: { database_id: database },
      properties: {
        "Property Name": {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        "Funda ID": {
          rich_text: [
            {
              text: {
                content: uuid,
              },
            },
          ],
        },
        Price: {
          rich_text: [
            {
              text: {
                content: price,
              },
            },
          ],
        },
        Location: {
          rich_text: [
            {
              text: {
                content: location,
              },
            },
          ],
        },
        "Living Area": {
          rich_text: [
            {
              text: {
                content: livingArea,
              },
            },
          ],
        },
        "Plot Area": {
          rich_text: [
            {
              text: {
                content: plotArea,
              },
            },
          ],
        },
        Rooms: {
          rich_text: [
            {
              text: {
                content: rooms,
              },
            },
          ],
        },
        "Makelaar Name": {
          rich_text: [
            {
              text: {
                content: makelaar,
              },
            },
          ],
        },
        Status: {
          rich_text: [
            {
              text: {
                content: status,
              },
            },
          ],
        },
        URL: {
          url: url,
        },
      },
    });
    console.log(`Success! Entry ${response.id} added.`);
    return response.id;
  } catch (error) {
    console.error(error.body);
  }
}

async function createSale(
  uuid,
  name,
  location,
  price,
  livingArea,
  plotArea,
  rooms,
  makelaar,
  status,
  url
) {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const database = process.env.NOTION_SALE_DATABASE_ID;
  try {
    const response = await notion.pages.create({
      parent: { database_id: database },
      properties: {
        "Property Name": {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        "Funda ID": {
          rich_text: [
            {
              text: {
                content: uuid,
              },
            },
          ],
        },
        Price: {
          rich_text: [
            {
              text: {
                content: price,
              },
            },
          ],
        },
        Location: {
          rich_text: [
            {
              text: {
                content: location,
              },
            },
          ],
        },
        "Living Area": {
          rich_text: [
            {
              text: {
                content: livingArea,
              },
            },
          ],
        },
        "Plot Area": {
          rich_text: [
            {
              text: {
                content: plotArea,
              },
            },
          ],
        },
        Rooms: {
          rich_text: [
            {
              text: {
                content: rooms,
              },
            },
          ],
        },
        "Makelaar Name": {
          rich_text: [
            {
              text: {
                content: makelaar,
              },
            },
          ],
        },
        Status: {
          rich_text: [
            {
              text: {
                content: status,
              },
            },
          ],
        },
        URL: {
          url: url,
        },
      },
    });
    console.log(`Success! Entry ${response.id} added.`);
    return response.id;
  } catch (error) {
    console.error(error.body);
  }
}

async function update(
  notionID,
  uuid,
  name,
  location,
  price,
  livingArea,
  plotArea,
  rooms,
  makelaar,
  status,
  url
) {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  try {
    const response = await notion.pages.update({
      page_id: notionID,
      properties: {
        "Property Name": {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        "Funda ID": {
          rich_text: [
            {
              text: {
                content: uuid,
              },
            },
          ],
        },
        Price: {
          rich_text: [
            {
              text: {
                content: price,
              },
            },
          ],
        },
        Location: {
          rich_text: [
            {
              text: {
                content: location,
              },
            },
          ],
        },
        "Living Area": {
          rich_text: [
            {
              text: {
                content: livingArea,
              },
            },
          ],
        },
        "Plot Area": {
          rich_text: [
            {
              text: {
                content: plotArea,
              },
            },
          ],
        },
        Rooms: {
          rich_text: [
            {
              text: {
                content: rooms,
              },
            },
          ],
        },
        "Makelaar Name": {
          rich_text: [
            {
              text: {
                content: makelaar,
              },
            },
          ],
        },
        Status: {
          rich_text: [
            {
              text: {
                content: status,
              },
            },
          ],
        },
        URL: {
          url: url,
        },
      },
    });
  } catch (error) {
    console.error(error.body);
  }
}

/* createRent(
  (uuid = "123456"),
  (name = "test"),
  (location = "test"),
  (price = "test"),
  (livingArea = "test"),
  (plotArea = "test"),
  (rooms = "test"),
  (makelaar = "test"),
  (status = "test"),
  (url = "https://mhrsntrk.com")
); */

/* update(
  (notionID = "6a0852a0-67da-4848-9262-98eba268cf0b"),
  (uuid = "123456"),
  (name = "test"),
  (location = "test"),
  (price = "test11111111"),
  (livingArea = "test"),
  (plotArea = "test"),
  (rooms = "test"),
  (makelaar = "test"),
  (status = "test"),
  (url = "https://mhrsntrk.com")
); */

module.exports = { createRent, createSale, update };
