import { v2 } from "cloudinary";
import fs from "fs"



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type: "auto"
            })
        console.log("file is uploaded on cloudinary", response);

        return response;
    }
    catch(error){
        fs.unlink(localFilePath) // remove the locally save temp file a
        console.log(error)
    }
}


export default uploadOnCloudinary