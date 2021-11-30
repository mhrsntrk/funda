# OVERVIEW

A simple Node.js application to scrape listings from Netherlands's the biggest property listing website [funda.nl](https://funda.nl) and store them into mongoDB and Notion database. 

# USAGE
### 1. Clone the repo and install dependencies
```
git clone https://github.com/mhrsntrk/funda.git
cd funda
yarn
```
### 2. Setup a mongoDB database
When you run the code for the first time listings should stored under `funda` database, `forrent` and `forsale` collections.
### 3. Create the .env file
```
MONGO_URI=
NOTION_KEY=
NOTION_RENT_DATABASE_ID=
NOTION_SALE_DATABASE_ID=
```
You can follow the instructions [here](https://developers.notion.com/docs/getting-started) to create your integration and link it to your Notion page. I basically created two pages to list marked as for sale and for rent seperately. You have to create all the columns with correct names before starting the application. You can find the list of columns that you need to create below;
```
Property Name (Title type)
Location (Text type)
Price (Text type)
Status (Text type)
URL (URL type)
Living Area (Text type)
Plot Area (Text type)
Rooms (Text type)
Makelaar Name (Text type)
Funda ID (Text type)
```
You can find the database ID of your page as shown below;
```
https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
                                  |--------- Database ID --------|
```
### 4. Run the project
```
yarn start
```
As you can see from the `index.js` file, it uses a cron job to pull the listings every hour, you can change the values as you like.

# DEPLOY

There is a Dockerfile on the repo, you can use it to deploy this application anywhere you like, I personally use [Caprover](https://caprover.com/).
