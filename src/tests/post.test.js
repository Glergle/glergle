import Post from '../models/post'
import User from '../models/user'
import dbHandler from './dbHandler'

beforeAll(async () => dbHandler.connect())

afterEach(async () => dbHandler.clearDatabase())

afterAll(async () => dbHandler.closeDatabase())

describe('Post', () => {
  const user = new User({
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    password: 'unsafepass'
  })
  user.save()
  it('can be created', () => {
    const post = {
      content: 'Lorem Ipsum',
      user: user._id
    }

    new Post(post).save()
      .then(post => {
        expect(post).toBeDefined()
        expect(post.content).toEqual('Lorem Ipsum')
        expect(post.user).toEqual(user._id)
      })
  })
})
