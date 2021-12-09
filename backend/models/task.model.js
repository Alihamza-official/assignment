

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {

    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
    
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('task', taskSchema, 'task');

module.exports = Task;
