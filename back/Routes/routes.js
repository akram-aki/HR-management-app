import Router from "express";
import multer from "multer";
import { loginUser } from "./controller.js";

import { uploadPhoto } from "./controller.js";

const router = Router();

const idk = multer({ dest: "C:/Users/songo/Desktop/hadjer/api/Images" });
router.post("/uploadPhoto", idk.array("photos", 100), uploadPhoto);

router.get("/login", loginUser);

export default router;
