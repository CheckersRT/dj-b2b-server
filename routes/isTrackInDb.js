// import express from "express";
// import Track from "../models/trackSchema.js";
// import mongoose from "mongoose";

// mongoose.connect(process.env.MONGODB_URI);

// const router = express.Router();

// router.post("/", async (request, response) => {
//   const id = request.body.id;
//   const track = await Track.find({ trackID: id });

//   if(!track) {
//     console.log("NO TRACK")
//   }
//   console.log(track)

// });

// export default router

// // app.get("/", async (request, response) => {
// //     const tracks = await Track.find();
// //     response.json(tracks);
// //   });
