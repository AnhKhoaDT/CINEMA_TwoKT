require('dotenv').config();

module.exports = {
    PORT: process.env.PORT|| 3000,
    MONGO_URI: process.env.MONGO_URI,
    ENVIRONMENT: process.env.NODE_ENV|| 'development',
    WEB_URL: process.env.WEB_URI,
    KEY_SESSION: process.env.KEY_SESSION 
}