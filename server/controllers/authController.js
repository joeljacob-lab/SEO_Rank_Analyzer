import User from "../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:"30d"})
}


//Register a new user
export const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if (!name || !email || !password){
            return res.status(400).json({success:false, message:"All fields are required"})
        }

        //check if user exists
        const existingUser = await User.findOne(email)
        if (existingUser){
            return res.status(400).json({success:false, message:"User already exists"})
        }

        //hashing password
        const hashedPassword = bcrypt.hash(password, await bcrypt.genSalt(10))

        //Creating a new user
        const user = await User.create({name, email, password:hashedPassword})

        const token = generateToken(user._id)

        res.status(201).json({success:true},token,user)

    } catch (error) {
        console.error("Registration Error:", error.message)
        res.json(500).json({success:false, message:"Server error"})
    }
}


//Login for existing user
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        if (!email || !password){
            return res.status(400).json({success:false, message:"All fields are required"})
        }

        //Find User
        const user = await User.findOne(email)
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credentials"})
        }
        
        //check password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false, message:"Incorrect Password"})
        }

        const token = generateToken(user._id)

        res.status(201).json({success:true},token,user)

    } catch (error) {
        console.error("Registration Error:", error.message)
        res.json(500).json({success:false, message:"Server error"})
    }
}