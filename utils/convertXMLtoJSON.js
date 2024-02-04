import { xml2js } from "xml-js";
import { readFileSync } from "fs";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url"

export default function convertXMLtoJSON(filePath, fileName) {
  var xml = readFileSync(
    filePath,
    "utf8"
  );

  const options = { ignoreComment: true, alwaysChildren: true };
  const json = xml2js(xml, options); // or convert.xml2json(xml, options)

  const resultJSON = JSON.stringify(json);

  const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
  const ext = ".json"
  const newJsonFileName = path.parse(fileName).name + ".json"
  console.log("newJsonFileName: ", newJsonFileName)


  const jsonPath = path.join(__dirname, "jsonFiles", newJsonFileName)
  console.log("jsonPath: ", jsonPath)

  fs.writeFile(jsonPath, resultJSON, (error) => {
    if (error) console.log("Error writing file : ", error);
    return
  });
    
  return json;
}
