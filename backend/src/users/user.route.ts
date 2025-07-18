// user.route.ts
import { Request, Response } from 'express';
import User from './user.model';
import generateToken from '../middleware/generate-token';
import verifyToken from '../middleware/verify-token';
const express = require('express');
const router = express.Router();

// Register endpoint 
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: "Username, email, and password are required" 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        message: "User with this email or username already exists" 
      });
    }
    
    const user = new User({ email, username, password });
    await user.save();
    
    res.status(201).json({ 
      message: "User registered successfully",
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Internal server error during registration",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
});

// Login Users 
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid email or password" 
      });
    }
    
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid email or password" 
      });
    }

    // Generating Token
 
    // const token = await generateToken(user._id)
    // res.cookie('token', token)

      // Generate token
    const token = await generateToken(user._id);
    
    // Set cookie with proper options
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite:'none',
      maxAge: 3600000
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
      // 1 hour in milliseconds
    });


    // Success response - DON'T include password
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error during login",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
});

// Logout user endpoint
router.post('/logout', async (req:Request, res:Response) =>{
  try{
    res.clearCookie('token');
    res.status(200).json({message: "User logged out successfully"});
  }catch(error){}
})

// Delete User
router.delete('/delete', async (req:Request, res:Response) =>{
    try {
        const {id}= req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
    } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error during Deleting user",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
})

// Get all Users
router.get('/users/:id', async (req:Request, res:Response) =>{
    try{

    }catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error during login",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
})
router.get("/users", async(req:Request, res:Response)=>{
    // res.send({message: "Protected Users"})
    try{
const users = await User.find({}, 'id email role').sort({createdAt: -1});
res.status(200).send(users)

    }
    catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error Fetching user",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
});

// Update User Route
router.put('/users/:id', async (req:Request, res:Response) =>{
    try{
        const {id}= req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new: true});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({
            message: "User role Updated successfully", user
        })

    }catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error during login",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
});
// Update edit profile
router.patch('/edit-profile', async (req:Request, res:Response) =>{
    try{
        const {userId, username, profileImage,bio,profession} = req.body
        if(!userId){
            return res.status(400).json({message: "User Id is required"})
        }
        const user = await User.findById(userId)
        if(!user){
                        return res.status(400).json({message: "User Not Found"})
        }
        // Update profile
        if(username !== undefined)user.username = username;
        if(profileImage !== undefined)user.profileImage = profileImage;
        if(bio !== undefined)user.bio = bio;
        if(profession !== undefined)user.profession = profession;
        if(username !== undefined)user.username = username;
        await user.save();
        res.status(200).json({message: "Profile Updated Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        createdAt: user.createdAt
      }
        })
    }catch (error) {
    console.error("Update User Profile:", error);
    res.status(500).json({ 
      message: "Update Uer profile",
      error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
    });
  }
})

export default router;