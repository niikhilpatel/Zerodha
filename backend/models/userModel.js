import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Define schema
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;  // Make sure this is correct
