const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

exports.signup = async (req, res) => {
try 
  {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User
    ({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
    } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
    if (!user) 
    {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) 
    {
        return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const token = jwt.sign(
      { userId: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname, password: user.password }, 
      secretKey,
      { expiresIn: '1h' }
    );
  
    res.status(200).json({ message: 'User has logged in', token });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

  
exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User has been deleted'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { firstname, lastname, email, password } = req.body;
  
    try 
    {
    const updatedUser = await User.findByIdAndUpdate
    (
        userId,
        { firstname, lastname, email, password },
        { new: true }
    );
    if (!updatedUser) 
    {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'User has been updated' });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getUserData = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  