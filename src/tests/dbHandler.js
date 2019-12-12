import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server-core'

const mongod = new MongoMemoryServer()

jest.setTimeout(60000)

const dbHandler = {}

dbHandler.connect = async () => {
  const uri = await mongod.getConnectionString()

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  await mongoose.connect(uri, opts)
}

dbHandler.closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

dbHandler.clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

export default dbHandler
