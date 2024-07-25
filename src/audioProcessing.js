import { stat, readdirSync } from 'node:fs'
import { mkdir, truncate } from 'node:fs/promises'
import { spawn } from 'node:child_process'

const playlistPath = 'assets/rock/'

function readDir () {
    return readdirSync(`${playlistPath}`)
}

const fileNameArray = readDir()

async function processSongs() 
{
    //Cria uma pasta para as musicas tratadas
    await mkdir(`${playlistPath}/processedSongs`, {recursive: true})

    //A cada musica ele trata ela e joga numa pasta de musicas tratadas
    fileNameArray.forEach((fileName) => {
        const songPath = playlistPath
    
        const ffmpegProcess = spawn('ffmpeg', [
            '-i', songPath + fileName,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', 'faststart',
            `${songPath + 'processedSongs/' +  fileName.replace("mp3", "mp4")}`,
        ], { stdio: ['pipe', 'inherit', 'inherit']})

        ffmpegProcess.stdin.write('Y\n')
        // console.log('[FILE IN PROCESS]: ', `${songPath}`)
        // console.log('[CREATED]: ', `assets/rock/processedSongs/${fileName}`)
    })

    ffmpegProcess.stdout.destroy()
    ffmpegProcess.stdin.destroy()
    ffmpegProcess.kill()
}

await processSongs()