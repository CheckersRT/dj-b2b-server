import Track from "../models/trackSchema.js";

export default async function saveToDb(request, response, metaData) {

    const track = new Track(metaData);
      track.save().then(
        () => console.log("One entry added"),
        (error) => console.log(error)
      );
}