const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load environment variables
dotenv.config();

const createInitialAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@library.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create initial admin
    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'admin123'
    });

    await admin.save();
    console.log('Initial admin user created successfully');
    console.log('Email: admin@library.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
};

createInitialAdmin(); 