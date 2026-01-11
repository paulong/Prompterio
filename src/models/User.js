import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  // Add these fields
  isPro: { type: Boolean, default: false },
  lemonSqueezyId: String, // To track the subscription in Lemon Squeezy
});

export default mongoose.models.User || mongoose.model('User', UserSchema);