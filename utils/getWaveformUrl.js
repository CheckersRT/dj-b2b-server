export default async function getWaveformUrl(publicID, trackDurationInSeconds) {
    const waveformWidth = calculateWaveFormWidth(trackDurationInSeconds);
    // const waveformWidth = 14000
    console.log("Waveformwidth: ", waveformWidth);
    const baseUrl = "https://res.cloudinary.com/dm1n4kfee/video/upload/";
    const waveformSettings = `c_scale,h_45,w_${waveformWidth}/b_white,co_black,fl_waveform/`;
  //   const fileName = "16509589_Machines__Original";
    const fileName = publicID;
    const waveformImageUrl = baseUrl + waveformSettings + fileName + ".png";
  
    return waveformImageUrl;
  }
  
  export function calculateWaveFormWidth(trackDurationInSeconds) {
    const waveformWidth = (trackDurationInSeconds / 0.02).toFixed(0);
  
  
    console.log(waveformWidth)
    return parseInt(waveformWidth);
  
    // 6.32 minutes = 392 seconds
    // 392/14000 *100 = 2.8%
    // 14000 * 0.028 = duration
    //392/0.028 = image length
    // durationInSeconds / 0.028 = imageWidth
  }
  