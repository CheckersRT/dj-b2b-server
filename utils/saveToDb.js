import Track from "../models/trackSchema.js";

export default async function saveToDb(data) {
  try {
    const track = new Track(data);
    await track.save();
    console.log("One entry added");
    return track;
  } catch (error) {
    console.error("Error with saving to database", error);
  }
}
