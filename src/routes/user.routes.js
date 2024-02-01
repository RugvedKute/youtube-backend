import { Router } from "express";
import {
  changeAccountDetails,
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logout,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// router.route("/register").post(registerUser);
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/get-current-user").get(verifyJwt, getCurrentUser);
router.route("/change-account-details").post(changeAccountDetails);
router.route("/");

export default router;
