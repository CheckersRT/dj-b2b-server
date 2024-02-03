import { xml2js } from "xml-js";
import { readFileSync } from "fs";
import fs from "fs";
import { Router } from "express";

const router = Router()

router.post("/", async (request, response) => {
    var xml = readFileSync(
        "/Users/Checkers/Documents/spiced/dj-b2b-server/public/userRekordbox.xml",
        "utf8"
      );
      var options = { ignoreComment: true, alwaysChildren: true };
      var result = xml2js(xml, options); // or convert.xml2json(xml, options)
      console.log(result);
    
      const resultJSON = JSON.stringify(result);
    
      fs.writeFile("public/rekordboxJSON.json", resultJSON, (error) => {
        if (error) console.log("Error writing file : ", error);
      });
    
      const playlists = result.elements[0].elements[2].elements[0].elements;
    
      console.log("Playlists: ", playlists);
    
      const playlistsArray = playlists.map((playlist) => playlist);
      console.log(playlistsArray);
    
      response.json(playlistsArray);
})

export default router