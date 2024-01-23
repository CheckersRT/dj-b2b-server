import express from "express";

const router = express.Router();

router.post("/", async (request, response) => {
  const rekordboxFile = readFileSync(
    "/Users/Checkers/Documents/spiced/dj-b2b-server/public/rekordboxJSON.json"
  );
  const rekordboxJSON = JSON.parse(rekordboxFile);

  const collection = rekordboxJSON.elements[0].elements[1].elements;

});
