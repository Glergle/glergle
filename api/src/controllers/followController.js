import User from '../models/user'
const followController = {}

followController.follow = async (req, res) => {
  if(req.user.following.includes(req.params.username)) {
    return res.status(400).json({message: 'Already followed'})
  }
  const followedUser = await User.findOne({username: req.params.username})
  if (!followedUser) {
    return res.status(400).json({message: 'No such user'})
  }
  req.user.followUser(req.params.username)
  req.user.save()
    .then(user => {
      followedUser.addFollower(user.username)
      followedUser.save()
      .catch(err => res.status(202).json({message: err.message}))
    })
    .then(user => res.status(200).json({message: `user ${followedUser.name} followed successfully`}))
    .catch(err => res.status(202).json({message: err.message}))
}

followController.unfollow = async (req, res) => {
  if (!req.user.following.includes(req.params.username)) {
    return res.status(400).json({message: 'User not followed'})
  }
  const unfollowedUser = await User.findOne({username: req.params.username})
  if(!unfollowedUser) {
    return res.status(400).json({message: 'No such user'})
  }
  req.user.unfollowUser(req.params.username)
  req.user.save()
    .then(user => {
      unfollowedUser.removeFollower(user.username)
      unfollowedUser.save()
    })
    .then(user => res.status(200).json({message: `unfollowed successfully`}))
    .catch(err => res.status(202).json({message: err.message}))
}

export default followController