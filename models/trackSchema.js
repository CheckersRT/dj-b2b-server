import mongoose from "mongoose"

const {Schema} = mongoose

const trackSchema = new Schema({
    trackID: {type: Number, required: true},
    name: {type: String, required: true},
    artist: {type: String, required: true},
    composer: {type: String, required: false},
    album: {type: String, required: true},
    grouping: {type: String, required: false},
    genre: {type: String, required: true},
    kind: {type: String, required: true},
    size: {type: Number, required: true},
    totalTime: {type: Number, required: true},
    discNumber: {type: Number, required: true},
    trackNumber: {type: Number, required: true},
    year: {type: Number, required: true},
    bpm: {type: Number, required: true},
    dateAdded: {type: String, required: true},
    bitRate: {type: Number, required: true},
    sampleRate: {type: Number, required: true},
    comments: {type: String, required: false},
    playCount: {type: Number, required: true},
    rating: {type: Number, required: true},
    location: {type: String, required: true},
    remixer: {type: String, required: false},
    tonality: {type: String, required: true},
    label: {type: String, required: true},
    mix: {type: String, required: false},
    url: {type: String, required: true},
    publicID: {type: String, required: true},
    waveformURL: {type: String, required: true},
});




const Track = mongoose.models.Track || mongoose.model("Track", trackSchema);

export default Track