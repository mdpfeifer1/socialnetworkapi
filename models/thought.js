const mongoose = require('mongoose');

// Reaction schema
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format the timestamp on query
    get: (createdAt) => dateFormat(createdAt),
  },
});

// Thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format the timestamp on query
    get: (createdAt) => dateFormat(createdAt),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Create a virtual field called reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create a helper function to format the timestamp
function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}

// Reaction model (schema only)
const reactionSchemaOnly = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format the timestamp on query
    get: (createdAt) => dateFormat(createdAt),
  },
});

const Reaction = mongoose.model('Reaction', reactionSchemaOnly);

module.exports = { Thought, Reaction };