const User = require('../models/User');

module.exports = {
// userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      } else {
      res.json(user);
    };} 
     catch (err) {
      res.status(500).json(err);
    }
  },



// Add a friend to a user
addFriend({params}, res) {
  User.findOneAndUpdate(
    {_id:params.userId},
    {$push:{friends:params.friendId}},
    {runValidators:true,new:true}
).then((user) => {
    !user ? res.status(404).json({ message:"No user found with that id" })
    :res.json(user)
}).catch((error) => res.status(500).json(error)
)
},

// Delete a friend from a user
deleteFriend({params}, res) {
  User.findOneAndUpdate(
    {_id:params.userId},
    {$pull:{friends:params.friendId}},
    {runValidators:true,new:true}
).then((user) => {
    !user ? res.status(404).json({ message:"No user found with that id" })
    :res.json(user)
}).catch((error) => res.status(500).json(error)
)}};