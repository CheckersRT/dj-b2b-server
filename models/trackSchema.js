import mongoose from "mongoose"

const {Schema} = mongoose

const trackSchema = new Schema({
    trackID: {type: Number, required: true},
    name: {type: String, required: true},
    artist: {type: String, required: true},
    composer: {type: String, required: false},
    album: {type: String, required: false},
    grouping: {type: String, required: false},
    genre: {type: String, required: false},
    kind: {type: String, required: true},
    size: {type: Number, required: true},
    totalTime: {type: Number, required: true},
    discNumber: {type: Number, required: false},
    trackNumber: {type: Number, required: false},
    year: {type: Number, required: false},
    bpm: {type: Number, required: true},
    dateAdded: {type: String, required: true},
    bitRate: {type: Number, required: true},
    sampleRate: {type: Number, required: true},
    comments: {type: String, required: false},
    playCount: {type: Number, required: false},
    rating: {type: Number, required: false},
    location: {type: String, required: true},
    remixer: {type: String, required: false},
    tonality: {type: String, required: true},
    label: {type: String, required: false},
    mix: {type: String, required: false},
    url: {type: String, required: true},
    publicID: {type: String, required: true},
    waveformURL: {type: String, required: true},
});


const Track = mongoose.models.Track || mongoose.model("Track", trackSchema);

export default Track