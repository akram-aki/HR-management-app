import Router from "express";
import multer from "multer";

import { uploadPhoto } from "./controller.js";

const router = Router();

const idk = multer({ dest: "C:/Users/songo/Desktop/hadjer/api/Images" });
router.post("/uploadPhoto", idk.array("photos", 100), uploadPhoto);

export default router;
