import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  task: {
    type: String,
    required: [true, 'Task is required.'],
  },
  // created_date: {
  //   type: Date,
  //   date: Date
  // },
  due_date: {
    type: String
  },
  priority: {
    type:String
  },
  status: {
    type:String
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  customer: {
    type: String,
    required: [true, 'Customer is required.'],
  },
  note: {
    type: String
  }
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;