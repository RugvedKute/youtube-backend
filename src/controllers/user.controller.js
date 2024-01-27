import { upload } from "../middlewares/multer.middlewares.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryFileUpload } from "../utils/uploadFile.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from the req
  // Validation not empty
  // Check if user exists or not ; email or username
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user onject, create a entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const response = User.findOne({
    username,
    email,
  });

  if (response) throw new ApiError(409, "The user is already exists!");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!");
  }

  const avatar = await cloudinaryFileUpload(avatarLocalPath);
  const coverImage = await cloudinaryFileUpload(coverImageLocalPath);

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = User.findById(user._id).select("-password -refresToken");

  if (!createdUser) {
    throw new ApiError(500, "Something when wrong while creating the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "The user has been created"));
});

export { registerUser };
