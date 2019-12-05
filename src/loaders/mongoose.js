import mongoose from 'mongoose'
import config from '../config'

export default () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
  mongoose.connect(`${config.dbUrl}:${config.dbPort}/${config.dbName}`, options)
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('Database Connected!')
  })

  return db
}
