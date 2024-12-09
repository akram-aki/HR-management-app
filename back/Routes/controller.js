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
  const { email, password } = req.body;

  pool.query(queries.dupEmailCheck, [email], (error, results) => {
    if (error) {
      res.status(500).json({ msg: "an error occured, try again later" });
      throw error;
    }
    if (results.rows.length > 0) {
      const user = results.rows[0];

      if (password === user.password) {
        user.password = null;
        jwt.sign(
          { email: user.email, id: user.id, name: user.user_name },
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

const getUserName = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      res.json({ name: userData.name, id: userData.id });
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

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath =
      path.replace(Path.basename(path), id + "000" + Date.now()) + "." + ext;
    fs.renameSync(path, newPath);

    uploadedPhotos.push(Path.basename(newPath));
  }
  res.json(uploadedPhotos);
};

export { uploadPhoto };
