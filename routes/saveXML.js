import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/",
  bodyParser.raw({
    type: "text/xml",
    limit: "5mb",
  }),
  (request, response) => {
    console.log(request.body);

    fs.writeFile("public/userRekordbox.xml", request.body, (error) => {
      if (error) console.log("Error writing file : ", error);
    });

    response.status(200).json({ message: "success" });
  }
);

export default router