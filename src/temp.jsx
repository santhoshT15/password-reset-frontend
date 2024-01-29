const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your User model schema
const User = mongoose.model('User', {
  email: String,
  randomString: String,
  password: String,
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Forgot Password route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Generate random string
  const randomString = Math.random().toString(36).substring(7);

  // Store the random string in the database
  user.randomString = randomString;
  await user.save();

  // Send email with the reset link
  const transporter = nodemailer.createTransport({
    // configure your email service
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3001/reset-password/${randomString}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send reset email' });
    }
    res.json({ message: 'Reset email sent successfully' });
  });
});

// Reset Password route
app.post('/reset-password/:randomString', async (req, res) => {
  const { randomString } = req.params;
  const { newPassword } = req.body;

  // Find user by random string
  const user = await User.findOne({ randomString });

  if (!user) {
    return res.status(404).json({ error: 'Invalid reset link' });
  }

  // Update password and clear random string
  user.password = newPassword;
  user.randomString = undefined;
  await user.save();

  res.json({ message: 'Password reset successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
