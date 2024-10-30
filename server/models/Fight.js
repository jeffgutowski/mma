import mongoose from 'mongoose';

const fightSchema = new mongoose.Schema({
  fighter1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fighter',
    required: true
  },
  fighter2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fighter',
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  weightClass: {
    type: String,
    required: true
  },
  votes: {
    fighter1: {
      type: Number,
      default: 0
    },
    fighter2: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Fight', fightSchema);