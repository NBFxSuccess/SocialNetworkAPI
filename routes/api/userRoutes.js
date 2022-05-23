const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/Users/:UserId/assignments
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/Users/:UserId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
