import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    email:{
        type: String,
        required: true,
        unique: true
    },
    name :{
        type: String,
        required: true,
        unique: true

    },
    rating :{
         type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,

    },
    date: {
        type:Date,
        required:true,
        default : Date.now()
    },
    profilePicture:{
        type :String,
        required:true,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyS4TygDepDH2AezAFSACrY7V3HuBaXl_Zq7E0d5jD-QW-7ZjPaV1KNY&s=10"
    },
    
    isApproved:{
        type: Boolean,
        required:true,
        default : false
    }
  });

  const Review =mongoose.model("Review",reviewSchema);

  export default Review ;