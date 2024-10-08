import axios from "axios";
import fs from "fs";
import Jimp from "jimp";


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      // const photoBuffer = await axios.get(inputURL, {
      //   responseType: "arrayBuffer",
      // });
      // const buffer = Buffer.from(photoBuffer?.data, 'binary');
      // console.log(buffer);
      const photo = await Jimp.read(inputURL);
      const outpath =
        "./tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath, (img) => {
          resolve(outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}


export function validateImageUrl(image_url) {
  try {
    new URL(image_url);
    return true;
  } catch (err) {
    return false;
  }
}


export function getImage(image_url, resolve) {
  fs.readFile(image_url, (err, data) => {
    if (err) throw err;
    resolve(data);
  })
}
