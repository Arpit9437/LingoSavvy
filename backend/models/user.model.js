import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  text: String,
  score: Number,
  issues: {
    grammar: Number,
    spelling: Number,
    clarity: Number,
    tone: Number
  },
  suggestions: [{
    type: String,
    original: String,
    suggestion: String,
    context: String,
    start: Number,
    end: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  analysisHistory: [analysisSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;