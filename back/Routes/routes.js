import Router from "express";
import multer from "multer";
import {
  fetchAbsences,
  fetchEMployeeAbsenceRequest,
  updateJustificationState,
  fetchPendingAbsences,
  loginUser,
  fetchThisMonthAttendance,
  getUserProfile,
  enter,
  requestAbsence,
  uploadPhoto,
} from "../controller.js";
import { verifyRole } from "../middleware.js"; // Import middleware

const router = Router();

// Multer configuration
const idk = multer({ dest: "C:/Users/songo/Desktop/hadjer/api/Images" });

// Public routes
router.post("/uploadPhoto", idk.array("photos", 100), uploadPhoto);
router.post("/login", loginUser);
router.post("/profile", getUserProfile);
router.post("/enter", enter);
router.post("/fetchAbsences", fetchAbsences);
router.post("/requestAbsence", requestAbsence);
router.post("/fetchPendingAbsences", fetchPendingAbsences);
router.post("/updateJustificationState", updateJustificationState);
router.post("/getEmployeeAbsenceRequest", fetchEMployeeAbsenceRequest);
router.post("/fetchThisMonthAttendance", fetchThisMonthAttendance);

// Role-based protected routes
router.get("/admin/dashboard", verifyRole("admin"), (req, res) => {
  res.json({ msg: "Welcome to the admin dashboard!" });
});

router.get("/user/profile", verifyRole("user"), (req, res) => {
  res.json({ msg: "Welcome to your profile!" });
});

export default router;
