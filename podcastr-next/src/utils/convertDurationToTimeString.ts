//Espaço para criar funções


//função recebe uma duration que é um numero e devolve uma string

export function convertDurationToTimeString(duration: number){

    const hours = Math.floor(duration / 3600); //arredonda pra baixo
    const minutes = Math.floor((duration%3600) / 60);
    const seconds = duration % 60;

    const finalResult = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0')) //2 caracteres. Se tiver 1, adiciona o '0' na frente
        .join(':')

    return finalResult;
}