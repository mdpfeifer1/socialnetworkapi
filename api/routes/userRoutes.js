const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  addFriend,
  deleteFriend,
} = require('../../controllers/userControllers');


router.route('/').get(getAll).post(create);

router.route('/:userId').get(getOne).put(update).delete(deleteOne);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;