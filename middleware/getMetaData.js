import jsmediatags from "jsmediatags"

export default function getMetaData(url) {

console.log(url)
  jsmediatags.read(url, {
    onSuccess: function (tag) {
      const tags = tag.tags;
      console.log(tag);
      //Create a buffer, stringify it and format it to a data url.
      const art = `data:${tags.picture.format};base64,${Buffer.from(
        tags.picture.data
      ).toString("base64")}`;

      const metaData = {
        url: url,
        artist: tags.artist,
        album: tags.album,
        title: tags.title,
        track: tags.track,
        art: art,
      }
      return metaData

    //   response.status(200).json({
    //     url: request.body.url,
    //     artist: tags.artist,
    //     album: tags.album,
    //     title: tags.title,
    //     track: tags.track,
    //     art: art,
    //   });
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
}
