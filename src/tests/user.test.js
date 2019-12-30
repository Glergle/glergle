import User from '../models/user'
import dbHandler from './dbHandler'
import Post from '../models/post'

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

  it('has posts', async () => {
    const user = await new User({
      name: 'Test User',
      username: 'testuser2',
      email: 'test2@example.com',
      password: 'unsafepass'
    }).save()

    const newPost = {
      content: 'test post',
      user: user._id
    }
    const testPost = await new Post(newPost).save()

    const usersPosts = await user.getPosts()
    console.log(usersPosts)
    expect(usersPosts).toBeDefined()
    expect(usersPosts).toContainEqual(expect.objectContaining(testPost._doc))
  })
})
