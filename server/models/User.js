import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    name: {type:String, required:true, trim:true },
    email: {type:String, required:true, unique:true, lowercase:true, trim:true },
    password: {type:String, required:true},
    plan: {type:String, enum: ["free","pro"], default:"free"},
    analysisCount: {type:Number, default:0},
    lastAnalysisDate: {type:String, default:null }
},{timestamps:true})


const User = mongoose.model("User",UserSchema)

export default User