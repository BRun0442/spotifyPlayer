import { createServer } from 'node:http'
//import './audioProcessing.js'
import { getAudioStream } from './audioPlayer.js'

const port = 3000

createServer(async (request, response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    }

    if(request.method === 'OPTIONS'){
        response.writeHead(204, headers)
        response.end()
        return;
    }

    response.writeHead(200, {
        'Content-type': 'audio/mp4'
    })

    //Le o arquivo de audio e manda por demanda para o front
    const audioStream = await getAudioStream();
    audioStream.pipe(response)

    })
    .listen(port, () => console.log(`Server is running at ${port}`))