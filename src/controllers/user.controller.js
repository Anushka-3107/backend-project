import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const userRegister = asyncHandler(async(req,res) => {
    //get user details from frontend
    //validation - check for non empty
    //check if user already exists - unique data : email, username
    //check for images or avatar
    //upload images or avatar to cloudinary
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response


    const {fullName,email,username,password} = req.body
    // console.log(user)
    console.log("req.files" , req.files);
    console.log("req.body:", req.body)


    if(
        [fullName,password,email,username].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields as required")
    }

    const existingUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existingUser){
        throw new ApiError(409,"Users already exist")
    }

    const avatarFiles = req.files?.avatar;
    console.log("avatarFiles : ",avatarFiles);

    if(!avatarFiles || !avatarFiles[0]){
         console.log("No avatar file uploaded — skipping Cloudinary upload");
        // throw new ApiError(400, "Avatar file is required");
    }
    const avatarLocalPath = avatarFiles[0].path;
     //console.log(req.files?.avatar[0]?.path)

    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
       throw new ApiError(400,"Avatar file is required")
   }

   const user = await User.create({
    email,
    fullName,
    password,
    username:username.toLowerCase(),
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
   })


   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user!")
   }


   return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
   )

})


export {userRegister};

