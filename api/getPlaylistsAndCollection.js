import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import fileExtentionLimiter from "../middleware/fileExtensionLimiter.js";
import fileSizeLimiter from "../middleware/fileSizeLimiter.js";
import filePayloadExists from "../middleware/filesPayloadExists.js";
import convertXMLtoJSON from "../utils/convertXMLtoJSON.js";
import getPlaylistsFromJSON from "../utils/getPlaylistFromJSON.js";
import getCollectionFromJSON from "../utils/getCollectionFromJSON.js";

const router = express.Router();

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  fileExtentionLimiter([".xml"]),
  fileSizeLimiter,
  filePayloadExists,

  (request, response) => {
    const file = request.files.file;
    const __dirname = dirname(fileURLToPath(import.meta.url)).slice(0, -6);
    const filePath = path.join(__dirname, "xmlFiles/", file.name);

    file.mv(filePath, (error) => {
      if (error)
        return response.status(500).json({ status: "error", message: error });
    });

    const json = convertXMLtoJSON(filePath, file.name);
    const playlistsArray = getPlaylistsFromJSON(json);
    const collection = getCollectionFromJSON(json)

    response
      .status(200)
      .json({
        status: "success",
        message: `${file.name} loaded successfully.`,
        playlists: playlistsArray,
        collection: collection,
      });
  }
);

export default router;

// fs.writeFile(filePath, request.body, (error) => {
//   if (error) console.log("Error writing file : ", error);
// });

// bodyParser.raw({
//   type: "text/xml",
//   limit: "5mb",
// }),
