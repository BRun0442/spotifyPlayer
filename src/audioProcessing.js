import { createReadStream, stat, readdirSync } from 'node:fs'

const playlistPath = './assets/rock/'

function readDir () {
    return readdirSync(`${playlistPath}`)
}

console.log('arquivos: ', readDir()) 

function randomFileInPlaylist() {
    let randomNumber = Math.floor(Math.random() * 2)
    return 1
}

let randomNumber = randomFileInPlaylist()

console.log('RANDOOOM: ', `${randomNumber}`)
console.log('Song:', readDir()[1]) 
let audioPath = `${playlistPath}${readDir()[randomNumber]}`

const audioStream = createReadStream(audioPath)

//O tamanho do arquivo é medido em bytes
// stat(audioPath, (err, stats) => {
//     err ? console.log('[[[[ERROR]]]]: ', err) : ''
//     stats ? console.log('Audio information: ', stats) : ''
// })

// glob('*.js', (err, matches) => {
//     console.log('Matches: ', matches)
// })

export { audioStream }