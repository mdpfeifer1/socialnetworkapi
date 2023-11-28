const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayJS = require('dayjs');


function formatTime (timestamp) {
  const day = dayJS(timestamp)
  return day.format('DD/MM/YYYY');
};

const thoughtSchema = new Schema({
  thoughtText: {
    type: String, 
    required: true, 
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date, 
    default: Date.now,
    get: formatTime
  },
  username: {
    type: String,
    require: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false, 
}
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;