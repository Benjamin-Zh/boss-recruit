const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String },
  avatar: { type: String },
  userType: { type: Boolean, required: true },
  meta: {
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
});

userSchema.pre('validate', async function() {
  if (this.isNew) {
    this.meta.createdAt = new Date();
  }

  this.meta.updatedAt = new Date();
});

mongoose.model('User', userSchema);
