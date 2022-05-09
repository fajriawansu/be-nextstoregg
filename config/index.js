const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serviceName: process.env.SERVICE_NAME,
    urlDb: process.env.MONGO_URL,
    urlAtlasDb: process.env.MONGO_ATLAS_URL
}