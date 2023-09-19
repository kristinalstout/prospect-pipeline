import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  address:{
    type: String,
    required:[true, 'Address is required'],
  },
  phone_number:{
    type: Number,
    required: [true, 'Phone number is required'],
    min: [10,'A phone number must have 10 digits'],
    max:[10, 'A phone number cannot exceed 10 digits']
  }
});

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;