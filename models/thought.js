const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');
const dayJS = require('dayjs');


function time (timestamp) {
  const day = dayJS(timestamp)
  return day.format('DD/MM/YYYY');
};

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String, 
    required: true, 
    minLength: 1,
    maxLength: 280
  }
})