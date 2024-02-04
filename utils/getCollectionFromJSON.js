import {readFileSync} from "fs"

export default function getCollectionFromJSON(json) {
    
    const collection = json.elements[0].elements[1].elements;
      
    return collection
}