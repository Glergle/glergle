import User from '../models/user'
import dbHandler from './dbHandler'

beforeAll(async () => dbHandler.connect())

afterEach(async () => dbHandler.clearDatabase())

afterAll(async () => dbHandler.closeDatabase())

describe('User', () => {
  it('can be created', () => {
    const newUser = {
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'unsafepass'
    }
    new User(newUser).save()
      .then(user => {
        expect(user).toBeDefined()
        expect(user).toHaveProperty('name', newUser.name)
      })
  })
})
