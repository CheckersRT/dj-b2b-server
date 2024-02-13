import { readFileSync } from "fs";
import path from "path";

export default function getTrackFromJSON(trackName) {
    const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

    const rekordboxFile = readFileSync(path.join(__dirname, "public/rekordboxJSON.json"))
    const rekordboxJSON = JSON.parse(rekordboxFile)
    const collection = rekordboxJSON.elements[0].elements[1].elements

    const track = collection.find((track) => track.attributes.Name === trackName)
    console.log("Track from function:", track)

    const trackAttributes = track.attributes

    return trackAttributes
}