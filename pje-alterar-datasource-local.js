const fs = require('fs/promises');
const { exitCode } = require('process');
const process = require('process');

const pathPje = '/tmp/';
const pathDS = pathPje + 'Datasources/'
const prefixoPrincipal = 'pjekz';
const prefixoSeguranca = 'pje-seguranca';
const sufixoLocahost = '-LOCALHOST';
const sufixoDevlocal = '-DEVLOCAL';
const sufixoDev = '-DEV';
const extensao = '.xml'

const dsPrincipal = () => prefixoPrincipal + extensao;
const dsPrincipalLocalhost = () => prefixoPrincipal + sufixoLocahost + extensao;
const dsPrincipalDev = () => prefixoPrincipal + sufixoDev + extensao;
const dsPrincipalDevlocal = () => prefixoPrincipal + sufixoDevlocal + extensao;

const dsSeguranca = () => prefixoSeguranca + extensao;
const dsSegurancaLocalhost = () => prefixoSeguranca + sufixoLocahost + extensao;
const dsSegurancaDev = () => prefixoSeguranca + sufixoDev + extensao;
const dsSegurancaDevlocal = () => prefixoSeguranca + sufixoDevlocal + extensao;

async function renomearArquivo(oldFile, newFile) {
    console.log('Renomeando', oldFile, 'para', newFile);
    await fs.rename(pathDS + oldFile, pathDS + newFile, (error) => {
        if (error) throw error
    });
}

async function renomearBasePrincipal(de, para) {
    console.log(`Alterando ambiente de ${de} para ${para}.`);

    await renomearArquivo(dsPrincipal(), de);
    await renomearArquivo(para, dsPrincipal());

    console.log('Ambiente configurado!');
}

async function renomearBaseSeguranca(de, para) {
    console.log(`Alterando ambiente de ${de} para ${para}.`);

    await renomearArquivo(dsSeguranca(), de);
    await renomearArquivo(para, dsSeguranca());

    console.log('Ambiente configurado!');
}

const paramOrigem = process.argv[2] ? process.argv[2].toLowerCase() : null;
const paramDestino = process.argv[3] ? process.argv[3].toLowerCase() : null;

if(!paramOrigem || !paramDestino){
    console.log(`Informe os parâmetros ´de' e 'para'.\nValores possíveis localhost, dev, devlocal.`);
    process.exit(1);
}

let arqOrigemPrincipal;
let arqOrigemSeguranca;
switch (paramOrigem) {
    case 'localhost':
        arqOrigemPrincipal = dsPrincipalLocalhost();
        arqOrigemSeguranca = dsSegurancaLocalhost();
        break;
    case 'dev':
        arqOrigemPrincipal = dsPrincipalDev();
        arqOrigemSeguranca = dsSegurancaDev();
        break;
    case 'devlocal':
        arqOrigemPrincipal = dsPrincipalDevlocal();
        arqOrigemSeguranca = dsSegurancaDevlocal();
        break;
    default:
        break;
}

let arqDestinoPrincipal;
let arqDestinoSeguranca;
switch (paramDestino) {
    case 'localhost':
        arqDestinoPrincipal = dsPrincipalLocalhost();
        arqDestinoSeguranca = dsSegurancaLocalhost();
        break;
    case 'dev':
        arqDestinoPrincipal = dsPrincipalDev();
        arqDestinoSeguranca = dsSegurancaDev();
        break;
    case 'devlocal':
        arqDestinoPrincipal = dsPrincipalDevlocal();
        arqDestinoSeguranca = dsSegurancaDevlocal();
        break;
    default:
        break;
}

renomearBasePrincipal(arqOrigemPrincipal, arqDestinoPrincipal);
renomearBaseSeguranca(arqOrigemSeguranca, arqDestinoSeguranca);