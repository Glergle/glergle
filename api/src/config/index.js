require('dotenv').config()

export default {
  port: process.env.PORT,
  dbUrl: process.env.MONGODB_URL,
  dbPort: process.env.MONGODB_PORT,
  dbName: process.env.MONGODB_NAME,
  secret: process.env.SECRET,
  api: {
    prefix: process.env.API_PREFIX
  }
}
