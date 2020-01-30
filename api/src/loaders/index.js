import mongooseLoader from './mongoose'

export default async () => {
  await mongooseLoader()
  console.log('DB initialized!')
}
