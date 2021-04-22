//SPA (single page aplication) -  Dados carregados apenas no momento em que se acessa a tela da aplicação. 
//Problema: Problemas com indexação do Google, pois os dados não estariam disponiveis assim que acessar e sim depois
//useEffect é um Hook do React que dispara efeitos colaterais, ou seja, executa uma ação se determinada coisa mudar
//Para executar a ação apenas uma vez, ou seja, uma vez quando carregar aquele componente pela primeira vez, basta passar um array sozinho
/*useEffect(() =>{
    fetch('http://localhost:3333/episodes')
    .then(response => response.json())
    .then(data => console.log(data))

  }, []) */


//SSR (server side rendering) - Só de exportar uma função com getServerSideProps(){} (em qualquer arquivo de 'pages') será entendido que deve executar ela antes do resto e assim estaria disponivel antes.
//Quando entrar na pagina os dados já estarão disponiveis, não precisará fazer nenhum tipo de requisição para o backend, pois isso foi feito na camada do next


//SSG (static side generation) - Gera uma page estática e todas as pessoas depois que acessarem, em um determinado periodo de tempo, vao consumir aquela mesma page.
// Pois no caso do podcast, lançando um a cada semana, a pagina nao vai mudar nesse espaço de tempo. Portanto, não é necessário fazer o carregamento dos mesmos dados sempre.
// A diferença é apenas no nome da função. Basta trocar para getStaticProps(){}
//Podendo retornar um novo parâmetro REVALIDATE que é o espaço de tempo até fazer um novo carregamento da página: Passando 60*60*8, significa uma chamada acada 8 horas, ou seja, apenas 3 requisições por dia.
//Porém este recurso só funciona em produção, necessitando criar uma build do projeto para simular

import {GetStaticProps} from 'next'; //tipagem 
import { api } from '../services/api';
import {format, parseISO} from 'date-fns'; //parseISO formata para um date do javascript
import ptBR from 'date-fns/locale/pt-BR';
import {convertDurationToTimeString} from '../utils/convertDurationToTimeString';
import styles from './home.module.scss'
import Image from 'next/image';

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  durationAsString: string,
  duration: number,
  url: string,
  description: string
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({latestEpisodes, allEpisodes} : HomeProps) {

  return (
    <div className={styles.homepage}>

      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>

        {/*sempre que for fazer uma iteração, ou seja, percorrer uma lista e retornar algo, faz um map() 
          No primeiro elemento que vem dentro do map precisa adicionar uma propriedade chamada Key, passando alguma informação do array como chave
          Identifica as li para o React não precisar criar tudo do 0 sempre que adicionar/remover um*/}
        <ul>{latestEpisodes.map(episode => {
          return (
            <li key={episode.id}>
              <Image width={192} height={192} src={episode.thumbnail} alt={episode.title} objectFit="cover"/>

              <div className={styles.episodeDetails}>

                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>

              </div>

              <button type="button">
                <img src="/play-green.svg" alt="Tocar Episodio"/>
              </button>
            </li>
          )
        })}</ul>
        <ul></ul>

      </section>
      
      <section className={styles.allEpisodes}>

        <h2>Todos os Episódios</h2>

      </section>

    </div>
  )
}


//aplicando a tipagem dupla, tanto nos parâmetros, quanto no result
export const getStaticProps : GetStaticProps = async ()=> {
  //http://localhost:3333/episodes?_limit=12&_sort=published_at&_order=desc   USANDO AXIOS FICA MAIS LIMPO
  //apenas 12 registros ordenado por publicação em ordem decrescente

  //com o axios posso desestruturar esses parametros e nao preciso passar a url padrão que foi informada lá localhost....

  const { data } = await api.get('episodes',{
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  //Fazer a formatação dos dados requisitados para a API LOGO depois de recebêlos e não dentro do return para evitar renderizações desnecessárias nos componentes
  const episodes = data.map(episode =>{

    return{
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at ), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })
  const latestEpisodes = episodes.slice(0,2) //separando da posição 0, duas casas
  const alltEpisodes = episodes.slice(2,episodes.lenght)
    
  //precisa sempre retornar o props aqui dentro, por isso, getServerSidePROPS
  //tudo que é retornado pelo props aqui, é repassado pelo props do componente la em cima
  return{
    props: {
      latestEpisodes: latestEpisodes,
      allEpisodes: alltEpisodes
    },
    
    revalidate: 60 * 60 * 8,
  }

}