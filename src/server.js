import app from './app'
import config from './config'

const startServer = () => {
  app.listen(config.port, (err) => {
    if (err) {
      throw err
    }
    console.log('server is running!')
  })
}

startServer()
