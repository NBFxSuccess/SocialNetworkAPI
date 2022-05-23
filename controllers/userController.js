const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
// Aggregate function for getting the overall grade using $avg
module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
     .then(
       (users) => res.json(users)
     )
     .catch(
       (err) => res.status(500).json(err)
     )
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany(
              { _id: {$in: user.thoughts}},
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'no user found',
            })
          : res.json({ message: 'Thought deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add an assignment to a user
  addUser(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {$set: req.body},
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      // { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found by that ID :(' })
          // : res.json(user)
          : res.json(`User '${req.params.friendId}' is now friends with ${req.params.userId}`)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      // { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found by that ID :(' })
          // : res.json(user)
          : res.json(`User '${req.params.friendId}' is now friends with ${req.params.userId}`)
      )
      .catch((err) => res.status(500).json(err));
  },
};


