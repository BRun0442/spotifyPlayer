import { createReadStream } from 'node:fs'
import { readdir } from 'node:fs/promises'

const playlistPath = './assets/rock/processedSongs/'

async function readDir () {
    try {
        const files = await readdir(playlistPath);
        //console.log(files);
        return files
      } catch (err) {
        console.error(err);
      }
}

function randomFileInPlaylist() {
    let randomNumber = Math.floor(Math.random() * 5)
    return randomNumber
}

async function getAudioStream() {
    const files = await readDir()
    const randomFile = files[randomFileInPlaylist()]

    if(randomFile) {
        const audioPath = playlistPath + randomFile
        return createReadStream(audioPath)
    }else {
        throw new Error('Nenhnuma música encontrada!')
    }
}


export { getAudioStream }