import { readFileSync } from "fs";

export default function getTrackFromJSON(trackName) {
    const rekordboxFile = readFileSync("/Users/Checkers/Documents/spiced/dj-b2b-server/public/rekordboxJSON.json")
    const rekordboxJSON = JSON.parse(rekordboxFile)
    const collection = rekordboxJSON.elements[0].elements[1].elements

    const track = collection.find((track) => track.attributes.Name === trackName)
    console.log("Track from function:", track)

    const trackAttributes = track.attributes

    return trackAttributes
}