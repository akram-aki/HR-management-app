import Router from "express";
import multer from "multer";
import {
  fetchAbsences,
  loginUser,
  getUserProfile,
  enter,
  requestAbsence,
} from "./controller.js";

import { uploadPhoto } from "./controller.js";

const router = Router();

const idk = multer({ dest: "C:/Users/songo/Desktop/hadjer/api/Images" });
router.post("/uploadPhoto", idk.array("photos", 100), uploadPhoto);

router.post("/login", loginUser);
router.post("/profile", getUserProfile);
router.post("/enter", enter);
router.post("/fetchAbsences", fetchAbsences);
router.post("/requestAbsence", requestAbsence);

export default router;
