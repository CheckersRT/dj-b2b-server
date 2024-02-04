import {readFileSync} from "fs"

export default function getPlaylistsFromJSON(json) {

    const playlistsArray = json.elements[0].elements[2].elements[0].elements;
  
    return playlistsArray
}