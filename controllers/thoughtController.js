const { Thought, User } = require('../models');

module.exports = {

    async getAll(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts)
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async getOne(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate('reactions');

            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID!'})
            }
            res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },



    async create(req, res) {
        try {
            const {thoughtText, username} = req.body;  
            const newThought = new Thought({
                thoughtText,
                username,
            });

            
            const savedThought = await newThought.save();
            const user = await User.findOneAndUpdate(
                {username },
                { $push: { thoughts: savedThought._id} },
                { new: true}
            );

            if(!user) {
                return res.status(400).json({ message: 'No user with that ID!'})
            }
            res.status(200).json(savedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    },

    async update(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
                );

                if(!thought) {
                    return res.status(404).json({ message: 'No thought with that ID!'})
                }
                res.status(200).json(thought);
        }   catch(err) {
            console.error(err)
            res.status(500).json(err);
        }
    },


    async deleteOne (req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId})

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID!'})
            }

            await User.findOneAndUpdate(
                { username: thought.username },
                {$pull: { thoughts: req.params.thoughtId}},
                { runValidators: true, new: true}
            )
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  //delete a reaction
    async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with that ID!" });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

}