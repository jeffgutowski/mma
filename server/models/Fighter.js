import mongoose from 'mongoose';

const fighterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  record: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Fighter', fighterSchema);