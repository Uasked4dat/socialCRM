import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  baseLocation: { type: String, required: true },
  currentLocation: {
    city: String,
    country: String,
    arrivalDate: Date,
    departureDate: Date,
  },
  notes: { type: String },
  interests: [String],
  tags: [String],
  socialProfiles: {
    linkedin: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
  dateMet: { type: Date },
  travelPlans: [
    {
      city: { type: String },
      country: { type: String },
      arrivalDate: { type: Date },
      departureDate: { type: Date },
      visibility: { type: Boolean, default: true },
    }
  ],
  lastContactDate: { type: Date },
  reminders: { type: String },
  friendshipStatus: {
    type: String,
    enum: ['close friend', 'acquaintance', 'business contact'],
    default: 'acquaintance',
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.Friend || mongoose.model('Friend', friendSchema);