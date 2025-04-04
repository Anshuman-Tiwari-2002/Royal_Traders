import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import RefreshToken from '../models/RefreshToken';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

interface UserActivity {
  userId: Types.ObjectId;
  action: string;
  details?: any;
  timestamp: Date;
}

const logUserActivity = async (activity: UserActivity) => {
  try {
    // TODO: Implement proper activity logging
    console.log('User Activity:', {
      userId: activity.userId,
      action: activity.action,
      details: activity.details,
      timestamp: activity.timestamp
    });
  } catch (error) {
    console.error('Error logging user activity:', error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      address: address || ''
    });

    // Save user
    await user.save();
    console.log('User registered successfully:', user._id);

    // Generate JWT token
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] };
    const token = jwt.sign(
      { userId: (user as IUser & { _id: Types.ObjectId })._id.toString() },
      JWT_SECRET as jwt.Secret,
      options
    );

    // Log successful registration
    await logUserActivity({
      userId: user._id,
      action: 'REGISTER',
      timestamp: new Date()
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).exec() as (IUser & { _id: Types.ObjectId }) | null;
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] };
    const token = jwt.sign(
      { userId: user._id.toString() },
      JWT_SECRET as jwt.Secret,
      options
    );
    
    // Generate refresh token
    const refreshTokenValue = jwt.sign(
      { userId: user._id.toString() },
      JWT_SECRET as jwt.Secret,
      { expiresIn: '7d' }
    );
    
    // Create refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const refreshToken = new RefreshToken({
      user: user._id,
      token: refreshTokenValue,
      expiresAt
    });
    
    await refreshToken.save();
    console.log('Refresh token saved:', refreshToken._id);

    // Log successful login
    await logUserActivity({
      userId: user._id,
      action: 'LOGIN',
      timestamp: new Date()
    });

    res.json({
      message: 'Login successful',
      token,
      refreshToken: refreshTokenValue,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        isEmailVerified: user.isEmailVerified,
        isLoggedIn: true
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, phone, address } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    console.log('Profile updated for user:', user._id);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ 
        message: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET as jwt.Secret) as { userId: string };
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if refresh token exists in database
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    
    // Check if token is expired
    if (tokenDoc.expiresAt < new Date()) {
      await RefreshToken.deleteOne({ _id: tokenDoc._id });
      return res.status(401).json({ message: 'Refresh token expired' });
    }
    
    // Generate new access token
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] };
    const newToken = jwt.sign(
      { userId: user._id.toString() },
      JWT_SECRET as jwt.Secret,
      options
    );
    
    res.json({
      message: 'Token refreshed successfully',
      token: newToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    // If the middleware passed, the token is valid
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // TODO: Send email with reset link
    // For now, just return the token in development
    res.json({ 
      message: 'Password reset email sent',
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};