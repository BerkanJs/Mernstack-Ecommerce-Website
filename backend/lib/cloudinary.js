import dotenv from "dotenv"
import{v2 as cloudinary} from "cloudinary"


dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDNINARY_CLOUD_NAME,
    api_key:process.env.CLOUDNINARY_API_KEY,
    api_secret:process.env.CLOUDNINARY_API_SECRET,
});

export default cloudinary;