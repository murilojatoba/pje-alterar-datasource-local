const fs = require('fs');
const process = require('process');

const pathPje = '/usr/local/pje/';
const pathDS = pathPje + 'workspace-eclipse/Datasources/'
const prefixoPrincipal = 'pjekz-ds';
const prefixoSeguranca = 'pjekz-seguranca-ds';
const prefixoLegado1Grau = 'pje-legado-1grau-ds';
const prefixoLegado2Grau = 'pje-legado-2grau-ds';
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

const dsLegado1Grau = () => prefixoLegado1Grau + extensao;
const dsLegado1GrauLocalhost = () => prefixoLegado1Grau + sufixoLocahost + extensao;
const dsLegado1GrauDev = () => prefixoLegado1Grau + sufixoDev + extensao;
const dsLegado1GrauDevlocal = () => prefixoLegado1Grau + sufixoDevlocal + extensao;

const dsLegado2Grau = () => prefixoLegado2Grau + extensao;
const dsLegado2GrauLocalhost = () => prefixoLegado2Grau + sufixoLocahost + extensao;
const dsLegado2GrauDev = () => prefixoLegado2Grau + sufixoDev + extensao;
const dsLegado2GrauDevlocal = () => prefixoLegado2Grau + sufixoDevlocal + extensao;

async function renomearArquivo(oldFile, newFile) {
    console.log('   Renomeando', oldFile, 'para', newFile);
    await fs.rename(pathDS + oldFile, pathDS + newFile, (error) => {
        if (error) throw error
    });
}

async function renomearBasePrincipal(de, para) {
    console.log(`Alterando ambiente de ${de} para ${para}.`);

    await renomearArquivo(dsPrincipal(), de);
    await renomearArquivo(para, dsPrincipal());
}

async function renomearBaseSeguranca(de, para) {
    console.log(`Alterando ambiente de ${de} para ${para}.`);

    await renomearArquivo(dsSeguranca(), de);
    await renomearArquivo(para, dsSeguranca());
}

async function renomearBaseLegado1Grau(de, para) {
    console.log(`Alterando ambiente de ${de} para ${para}.`);

    await renomearArquivo(dsLegado1Grau(), de);
    await renomearArquivo(para, dsLegado1Grau());
}

async function renomearBaseLegado2Grau(de, para) {
    console.log(`Alterando ambiente de ${de} para ${para}.`);

    await renomearArquivo(dsLegado2Grau(), de);
    await renomearArquivo(para, dsLegado2Grau());
}

const paramOrigem = process.argv[2] ? process.argv[2].toLowerCase() : null;
const paramDestino = process.argv[3] ? process.argv[3].toLowerCase() : null;

if(!paramOrigem || !paramDestino){
    console.log(`Informe os parâmetros ´de' e 'para'.\nValores possíveis localhost, dev, devlocal.`);
    process.exit(1);
}

let arqOrigemPrincipal;
let arqOrigemSeguranca;
let arqOrigemLegado1Grau;
let arqOrigemLegado2Grau;
switch (paramOrigem) {
    case 'localhost':
        arqOrigemPrincipal = dsPrincipalLocalhost();
        arqOrigemSeguranca = dsSegurancaLocalhost();
        arqOrigemLegado1Grau = dsLegado1GrauLocalhost();
        arqOrigemLegado2Grau = dsLegado2GrauLocalhost();
        break;
    case 'dev':
        arqOrigemPrincipal = dsPrincipalDev();
        arqOrigemSeguranca = dsSegurancaDev();
        arqOrigemLegado1Grau = dsLegado1GrauDev();
        arqOrigemLegado2Grau = dsLegado2GrauDev();
        break;
    case 'devlocal':
        arqOrigemPrincipal = dsPrincipalDevlocal();
        arqOrigemSeguranca = dsSegurancaDevlocal();
        arqOrigemLegado1Grau = dsLegado1GrauDevlocal();
        arqOrigemLegado2Grau = dsLegado2GrauDevlocal();
        break;
    default:
        break;
}

let arqDestinoPrincipal;
let arqDestinoSeguranca;
let arqDestinoLegado1Grau;
let arqDestinoLegado2Grau;
switch (paramDestino) {
    case 'localhost':
        arqDestinoPrincipal = dsPrincipalLocalhost();
        arqDestinoSeguranca = dsSegurancaLocalhost();
        arqDestinoLegado1Grau = dsLegado1GrauLocalhost();
        arqDestinoLegado2Grau = dsLegado2GrauLocalhost();
        break;
    case 'dev':
        arqDestinoPrincipal = dsPrincipalDev();
        arqDestinoSeguranca = dsSegurancaDev();
        arqDestinoLegado1Grau = dsLegado1GrauDev();
        arqDestinoLegado2Grau = dsLegado2GrauDev();
        break;
    case 'devlocal':
        arqDestinoPrincipal = dsPrincipalDevlocal();
        arqDestinoSeguranca = dsSegurancaDevlocal();
        arqDestinoLegado1Grau = dsLegado1GrauDevlocal();
        arqDestinoLegado2Grau = dsLegado2GrauDevlocal();
        break;
    default:
        break;
}

async function executar(){
    await renomearBasePrincipal(arqOrigemPrincipal, arqDestinoPrincipal);
    await renomearBaseSeguranca(arqOrigemSeguranca, arqDestinoSeguranca);
    await renomearBaseLegado1Grau(arqOrigemLegado1Grau, arqDestinoLegado1Grau);
    await renomearBaseLegado2Grau(arqOrigemLegado2Grau, arqDestinoLegado2Grau);
    console.log('Ambiente configurado!');
}

executar();