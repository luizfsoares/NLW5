//criando uma variavel axios, exportando para importar lá

import axios from 'axios';

export const api = axios.create({

    baseURL: 'http://localhost:3333'
})