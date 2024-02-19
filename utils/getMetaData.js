import jsmediatags from "jsmediatags";

export default async function getMetaData(url) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(url, {
      onSuccess: function (tag) {
        const tags = tag.tags;
        // console.log(tag);
        //Create a buffer, stringify it and format it to a data url.
        const art = `data:${tags.picture.format};base64,${Buffer.from(
          tags.picture.data
        ).toString("base64")}`;

        const metaData = {
          name: tags.title,
          artist: tags.artist,
          album: tags.album,
          trackNumber: tags.track,
          bpm: tags.TBPM.data,
          tonality: tags.TKEY.data,
          art: art,
        };
        // console.log("metadata: ", metaData);
        resolve(metaData);
      },
      onError: function (error) {
        console.log(":(", error.type, error.info);
        reject(error)
      },
    });
  });
}
