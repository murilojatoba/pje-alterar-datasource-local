const fs = require('fs/promises');
const process = require('process');

const pathPje = '/tmp/';
const pathDS = pathPje + 'Datasources/'
const prefixoPrincipal = 'pjekz';
const prefixoSeguranca = 'pje-seguranca';
const sufixoLocahost = '-LOCALHOST';
const sufixoDevlocal = '-DEVLOCAL';
const extensao = '.xml'

const dsPrincipal = () => pathDS + prefixoPrincipal + extensao;

const dsPrincipalLocalhost = () => pathDS + prefixoPrincipal + sufixoLocahost + extensao;

const dsPrincipalDevlocal = () => pathDS + prefixoPrincipal + sufixoDevlocal + extensao;

async function renomearArquivo(oldFile, newFile) {
    console.log('Alterando', oldFile, 'para', newFile);
    await fs.rename(oldFile, newFile, (error) => {
        if (error) throw error
    });
}

async function main() {
    await renomearArquivo(dsPrincipal(), dsPrincipalLocalhost());
    await renomearArquivo(dsPrincipalDevlocal(), dsPrincipal());

    console.log('Ambiente configurado!');
}

//main();
const de = process.argv[2] ? process.argv[2].toLowerCase() : null;
const para = process.argv[3] ? process.argv[3].toLowerCase() : null;

console.log('de', de, 'para', para);