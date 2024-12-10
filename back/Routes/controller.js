import pool from "../db.js";
import { queries } from "./queries.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import download from "image-downloader";
import { fileURLToPath } from "url";
import Path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const jwtSecret = "ASDADasldfakd&%*w12240810234598as%^kfdnjasf02as";

const loginUser = (req, res) => {
  const { username, password } = req.body;

  pool.query(queries.dupNameCheck, [username], (error, results) => {
    if (error) {
      res.status(500).json({ msg: "an error occured, try again later" });
      throw error;
    }
    if (results.rows.length > 0) {
      const user = results.rows[0];

      if (password === user.password) {
        user.password = null;
        jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          jwtSecret,
          {},
          (err, token) => {
            if (err) res.status(500).json("failed to generate token");

            return res.json(token);
          }
        );
      }
    } else res.status(500).json({ msg: "wrong credentials" });
  });
};

const getUserProfile = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      res.json({
        username: userData.username,
        id: userData.id,
        role: userData.role,
      });
    });
  }
};

const addPhotoLink = async (req, res) => {
  const { id, photoLink } = req.query;
  const dir = Path.join(Path.dirname(__dirname), "images");
  const newName = id + "000" + Date.now() + ".jpg";

  if (photoLink.slice(0, 4) === "blob") {
    //dosnt work yet :c
    try {
      const r = await axios.get(photoLink, { responseType: "arraybuffer" });
      console.log(r);

      // fs.copyFile(photoLink, dir + "/" + newName, {
      // done: function (err) {
      // console.log("done");
      // },
      // });
    } catch (e) {
      console.log("didnt work");
    }
  } else {
    const options = {
      url: photoLink,
      dest: dir + "/" + newName,
    };
    download
      .image(options)

      .catch((err) => console.error("workent"));
  }
  res.json(newName);
};

const uploadPhoto = (req, res) => {
  const uploadedPhotos = [];
  const { id } = req.body;

  // Define the directory to save the uploaded files
  const uploadDir = Path.join(__dirname, "uploads");

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Process each uploaded file
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    // Extract file extension
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    // Generate a new filename
    const newFileName = `${id}_000${Date.now()}.${ext}`;
    const newPath = Path.join(uploadDir, newFileName);

    // Move the file to the target directory
    fs.renameSync(path, newPath);

    // Add the new file name to the response list
    uploadedPhotos.push(newFileName);
  }

  // Send response with the list of uploaded file names
  res.json(uploadedPhotos[0]);
};
const enter = (req, res) => {
  const { id, status, justification, token, date } = req.body;
  let Date;
  if (!date) {
    Date = new Date().toISOString().split("T")[0];
  } else {
    Date = date;
  }

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.json("not authorised");
    });
  }
  pool.query(
    queries.insertAttendance,
    [id, Date, status, justification],
    (error, results) => {
      if (error) return res.json("error");
      res.json("success");
    }
  );
};
const leave = (req, res) => {
  const { id, token, date, hours_worked } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.json("not authorised");
    });
  }
  pool.query(
    queries.updateAttendance,
    [hours_worked, id, date],
    (error, results) => {
      if (error) return res.json("error");
      res.json("success");
    }
  );
};
const fetchAbsences = (req, res) => {
  const { token, id } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.json("not authorised");
    });
  }
  pool.query(queries.fetchAbsences, [id], (error, results) => {
    if (error) return res.json("an error occured while fetching");
    res.json(results.rows[0]);
  });
};

const requestAbsence = (req, res) => {
  const { date, selected, photoLink, id, token, username } = req.body;
  console.log({ date, selected, photoLink, id, token, username });
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.json("not authorised");
    });
  }

  pool.query(
    queries.requestAbsence,
    [id, username, date, photoLink, selected],
    (error, results) => {
      if (error) return res.json("an error occured while fetching");
      res.json(results.rows[0]);
    }
  );
};

const payCalculator = (req, res) => {
  const { id, token, totSI } = req.body;
  let base_salary;
  const calIrg = (base_salary, tot) => {
    const baseImposable = base_salary + totSI;
    let irg = baseImposable;
  };
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) return res.json("not authorised");
    });
  }

  pool.query("SELECT * FROM Employees WHERE id=$1", [id], (error, result) => {
    if (error) return res.json("an error occured while fetching");
    base_salary = result.rows[0].base_salary;
  });
  const RETENUE_SECU_SLE = base_salary * 0.09;
  const RETENUE_IRG = calIrg(base_salary, tot);
};

export {
  fetchAbsences,
  uploadPhoto,
  getUserProfile,
  loginUser,
  enter,
  leave,
  requestAbsence,
};
