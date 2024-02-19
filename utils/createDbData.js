import getWaveformUrl from "./getWaveformUrl.js";

export default async function createDbData(metaData, cloudinaryResponse) {

    return {
        name: metaData.name,
        artist: metaData.artist,
        album: metaData.album,
        kind: cloudinaryResponse.format,
        size: cloudinaryResponse.bytes,
        totalTime: cloudinaryResponse.duration,
        trackNumber: metaData.trackNumber,
        bpm: metaData.bpm,
        dateAdded: cloudinaryResponse.created_at,
        bitRate: cloudinaryResponse.bit_rate,
        tonality: metaData.tonality,
        url: cloudinaryResponse.secure_url,
        publicID: cloudinaryResponse.public_id,
        waveformURL: await getWaveformUrl(cloudinaryResponse.public_id, cloudinaryResponse.duration),
        coverArt: metaData.art,
    }
}